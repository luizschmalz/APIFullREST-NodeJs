import {Joi} from 'celebrate';
import { Company } from './company.model.js';
import { Customer, newCustomerSchema } from './customer.model.js';
import { Adress, newAddressSchema } from './address.model.js';
import { PaymentMethod } from './paymentMethod.model.js';
import { OrderItem, orderItemSchema } from './order-item.model.js';
import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from 'firebase-admin/firestore';

export class Order {
    id: string;
    empresa: Company
    cliente: Customer;
    endereco: Adress;
    cpfCnpjCupom: string;
    date: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items?: OrderItem[];
    status: OrderStatus;
    observacao: string;
    subtotal: number;
    total: number;


    constructor ( data: any){
        this.id = data.id
        this.empresa = new Company(data.empresa)
        this.cliente = data.cliente
        this.endereco = data.endereco
        this.cpfCnpjCupom = data.cpfCnpjCupom
        this.date = data.date instanceof Timestamp ? data.date.toDate() : data.date
        this.isEntrega = data.isEntrega
        this.formaPagamento = new PaymentMethod(data.formaPagamento)
        this.taxaEntrega = data.taxaEntrega
        this.items = data.items?.map((item: any) => new OrderItem(item))
        this.status = data.status ?? OrderStatus.pendente
        this.observacao = data.observacao ?? null
        this.subtotal = data.subtotal
        this.total = data.total
    }

    getSubtotal(): number {
        return this.items?.map(item => item.getTotal()).reduce((total, nextvalue) => total + nextvalue, 0) ?? 0;
    }

    getTotal(): number {
        console.log(this.taxaEntrega)
        return this.getSubtotal() + this.taxaEntrega;
        
    }
}

export enum OrderStatus {
    pendente = 'pendente',
    aprovado = 'aprovado',
    entrega = 'entrega',
    concluido = 'concluido',
    cancelado = 'cancelado'
}

export type OrderParam = {
    empresaId?: string;
    dataInicio?: Date;
    dataFim?: Date;
    status?: OrderStatus;
}
export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: newCustomerSchema.required(),
    endereco: Joi.alternatives().conditional(
        "isEntrega",
        {is: true, 
        then: newAddressSchema.required(), 
        otherwise: Joi.object().only().allow(null).default(null)
        }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required(),
    ).allow(null).required(),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente).required(),
    observacao: Joi.string().allow(null).trim().default(null),  
})

export const orderParamSchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus)),
})

export const changeStatusSchema = Joi.object().keys({
    status: Joi.string().only().allow(
        OrderStatus.aprovado,
        OrderStatus.entrega,
        OrderStatus.concluido,
        OrderStatus.cancelado
    ).required()
})

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order:Order): DocumentData =>{
        return {
            empresa:{
                id: order.empresa.id,
                logomarca: order.empresa.logomarca,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao
            },
            cliente: {
                nome: order.cliente.nome,
                telefone: order.cliente.telefone,
            },
            endereco: {
                cep: order.endereco.cep,
                logradouro: order.endereco.logradouro,
                numero: order.endereco.numero,
                complemento: order.endereco.complemento,
                bairro: order.endereco.bairro,
                cidade: order.endereco.cidade,
                estado: order.endereco.estado
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            date: FieldValue.serverTimestamp(),
            isEntrega: order.isEntrega,
            formaPagamento: {
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao
            },
            taxaEntrega: order.taxaEntrega,
            status: order.status,
            observacao: order.observacao,
            subtotal: order.getSubtotal(),
            total: order.getTotal()
        }
    },
    fromFirestore: (snapshot:QueryDocumentSnapshot): Order =>{
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}