import { Product } from './product.model.js';
import {Joi} from 'celebrate';

export type OrderItem = {
    produto: Product
    quantidade: number;
    observacao: string;
}

export const orderItemSchema: Joi.ObjectSchema = Joi.object().keys({
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantidade: Joi.number().integer().min(1).required(),
    observacao: Joi.string().allow(null).default(null)
})