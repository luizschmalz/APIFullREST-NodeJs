import { NotFoundError } from "../errors/not-found.error.js";
import { OrderItem } from "../models/order-item.model.js";
import { Order, OrderParam, OrderStatus } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repositories.js";
import { OrderRepository } from "../repositories/orders.repositorie.js";
import { PaymentMethodRepository } from "../repositories/paymentMethod.repositories.js";
import { ProductRepository } from "../repositories/product.repositories.js";

export class OrderService{

    private orderRepository: OrderRepository
    private companyRepository: CompanyRepository
    private paymentRepository: PaymentMethodRepository
    private productRepository: ProductRepository

    constructor(){
        this.orderRepository = new OrderRepository()
        this.companyRepository = new CompanyRepository()
        this.paymentRepository = new PaymentMethodRepository()
        this.productRepository = new ProductRepository()
    }

    async createOrder(order: Order){
        const company = await this.companyRepository.getById(order.empresa.id!)
        if(!company){
            throw new NotFoundError("Company not found")
        }
        order.empresa = company

        const paymentMethod = await this.paymentRepository.getById(order.formaPagamento.id!)
        if(!paymentMethod){
            throw new NotFoundError("Payment method not found")
        }   
        order.formaPagamento = paymentMethod

        for(let item of order.items!){
            const product = await this.productRepository.getById(item.produto.id!)
            if(!product){
                throw new NotFoundError("Product not found")
            }
            item.produto = product
        }

        await this.orderRepository.saveOrder(order) 
    }

    async getAllOrders(query: OrderParam): Promise<Order[]>{
        return await this.orderRepository.getAllOrders(query)
    }

    async getItems(id: string): Promise<OrderItem[]>{
        return this.orderRepository.getItems(id)
    }

    async getById(id: string): Promise<Order>{
        return this.orderRepository.getById(id)
    }

    async changeStatus(id: string, status: OrderStatus){
        this.orderRepository.changeStatus(id, status)
    }
}