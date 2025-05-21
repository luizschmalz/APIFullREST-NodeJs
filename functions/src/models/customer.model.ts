import {Joi} from 'celebrate'

export type Customer = {
    nome: string;
    telefone: string;
}

export const newCustomerSchema = Joi.object().keys({
    nome: Joi.string().required().min(4),
    telefone: Joi.string().regex(/(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/).required(),
})