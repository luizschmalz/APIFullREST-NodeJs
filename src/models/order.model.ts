import {Joi} from 'celebrate';
import { Company } from './company.model.js';
import { Customer, newCustomerSchema } from './customer.model.js';
import { Adress, newAddressSchema } from './address.model.js';
import { PaymentMethod } from './paymentMethod.model.js';
import { OrderItem, orderItemSchema } from './order-item.model.js';

export type Order = {
    empresa: Company
    cliente: Customer;
    endereco: Adress;
    cpfCnpjCupom: string;
    date: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items: OrderItem[];
    status: OrderStatus;
    
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
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente).required()
})

export const orderParamSchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus)),
})
