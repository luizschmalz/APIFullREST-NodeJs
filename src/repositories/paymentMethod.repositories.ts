import { PaymentMethod, paymentMethodConverter } from "../models/paymentMethod.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class PaymentMethodRepository{

    private collection: CollectionReference<PaymentMethod>

    constructor(){
        this.collection = getFirestore().collection('payment-methods').withConverter(paymentMethodConverter)
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => doc.data())
    }

    async getById(paymentId: string): Promise<PaymentMethod | null> {
        const doc = await this.collection.doc(paymentId).get();
        return doc.data() ?? null;
       
    }

    async createPaymentMethod(payment: PaymentMethod): Promise<void> {
        await this.collection.add(payment)
    }

    
    async updatePaymentMethod(payment: PaymentMethod): Promise<void> {
        await this.collection.doc(payment.id).set(payment)
    }

    async deletePaymentMethod(paymentId: string): Promise<void> {
        await this.collection.doc(paymentId).delete()
    }
}