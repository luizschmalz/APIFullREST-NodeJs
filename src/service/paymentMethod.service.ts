import { PaymentMethod } from "../models/paymentMethod.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethodRepository } from "../repositories/paymentMethod.repositories.js";

export class PaymentService {

    private paymentRepository : PaymentMethodRepository;

    constructor(){
        this.paymentRepository = new PaymentMethodRepository();
    }

    async getAll(): Promise<PaymentMethod[]>{
        return this.paymentRepository.getAll();
    }

    async getById(paymentId: string) : Promise<PaymentMethod>{
        const payment = await this.paymentRepository.getById(paymentId)
        if(!payment){
            throw new NotFoundError('Payment Method not found')
        }

        return payment
    }

    async createPayment(payment: PaymentMethod) : Promise<void>{
        this.paymentRepository.createPaymentMethod(payment)
    }

    async updatePayment(paymentId: string, payment: PaymentMethod) : Promise<void>{

        const _payment = await this.paymentRepository.getById(paymentId)
        if(!_payment){
            throw new NotFoundError('payment not found')
        }
        

        _payment.descricao = payment.descricao;
        _payment.ativa = payment.ativa;

        await this.paymentRepository.updatePaymentMethod(_payment)
       
    }

    async deletePayment(paymentId: string) : Promise<void>{
        await this.paymentRepository.deletePaymentMethod(paymentId)
    }
}