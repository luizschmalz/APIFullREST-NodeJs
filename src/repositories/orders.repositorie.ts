import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, OrderParam, OrderStatus } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
//import { orderItemConverter } from "../models/order-item.model.js";

export class OrderRepository{
    
    private collection: CollectionReference<Order>;

    constructor(){
        this.collection = getFirestore().collection("orders").withConverter(orderConverter)
    }

    async saveOrder(order: Order){
        const batch = getFirestore().batch()

        const orderRef = this.collection.doc()
        batch.create(orderRef, order)

        const itemsRef = orderRef.collection("items").withConverter(orderItemConverter)
        for(let item of order.items!){
            batch.create(itemsRef.doc(), item)
        }

        await batch.commit()

        /*
        const orderRef = await this.collection.add(order)
        for(let item of order.items){
            orderRef.collection("items").withConverter(orderItemConverter).add(item)
        }*/
    }

    async getAllOrders(queryParams: OrderParam){
        let query: FirebaseFirestore.Query<Order> = this.collection

        if(queryParams.empresaId){
           query= query.where("empresa.id", "==", queryParams.empresaId)
        }

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).startOf("day").toDate()
            console.log("startDate", queryParams.dataInicio)
            query = query.where("date", ">=", queryParams.dataInicio);
          }
        
        if(queryParams.dataFim){
            queryParams.dataFim = dayjs(queryParams.dataFim).endOf("day").toDate()
            console.log("endDate", queryParams.dataFim)
            query = query.where("date", "<=", queryParams.dataFim);
        }
        
        if(queryParams.status){
            query = query.where("status", "==", queryParams.status)
        }

        const orders = await query.get()

        return orders.docs.map(doc => doc.data())
    }

    async getItems(id: string): Promise<OrderItem[]>{
        const pedidoRef = this.collection.doc(id)
        const itemsRef = await pedidoRef.collection("items").withConverter(orderItemConverter).get()
        return itemsRef.docs.map(doc => doc.data())
    }
    
    async getById(id: string): Promise<Order>{
        const order = (await this.collection.doc(id).get()).data() 
        if(!order){
            throw new NotFoundError("Order not found")
        }
        order.items = await this.getItems(id)
        return order
    }

    async changeStatus(id: string, status: OrderStatus) {
        await this.collection.doc(id).withConverter(null).set({
            status: status
        }, {
            merge: true
        })
    }
     
        

}


