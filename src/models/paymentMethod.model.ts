import {Joi} from 'celebrate'

export type PaymentMethod = {
    id?: string;
    descricao: string;
    ativa: boolean;
}

export const newPaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().required().min(3),
    ativa: Joi.boolean().only().allow(true).default(true),
})

export const updatePaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().required().min(3),
    ativa: Joi.boolean().required(),
})