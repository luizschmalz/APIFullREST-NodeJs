import { PaymentMethod } from "../models/paymentMethod.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class PaymentMethodRepository{

    private collection: CollectionReference

    constructor(){
        this.collection = getFirestore().collection('payment-methods')
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            descricao: doc.data().descricao,
            ativa: doc.data().ativa
        }}) as PaymentMethod[];
    }

    async getById(paymentId: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(paymentId).get();
        if (doc.exists) {
            return ({
                id: doc.id,
                descricao: doc.data()?.descricao,
                ativa: doc.data()?.ativa
            }) as PaymentMethod;
        }else{
            return null
        }
       
    }

    async createPaymentMethod(payment: PaymentMethod): Promise<void> {
        await this.collection.add(payment)
    }

    
    async updatePaymentMethod(payment: PaymentMethod): Promise<void> {
        let docRef = this.collection.doc(payment.id!)
        delete payment.id
        await docRef.set(payment)
    }

    async deletePaymentMethod(paymentId: string): Promise<void> {
        await this.collection.doc(paymentId).delete()
    }
}