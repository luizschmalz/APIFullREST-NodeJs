import { Joi } from "celebrate";

export type Adress = {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
}

export const newAddressSchema = Joi.object().keys({
    cep: Joi.string().required().min(8).max(8),
    logradouro: Joi.string().required(),
    numero: Joi.string().required(),
    complemento: Joi.string().allow(null).default(null),
    bairro: Joi.string().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().required().uppercase().length(2)
})
