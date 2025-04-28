import { Joi } from "celebrate";
import { Category } from "./categories.model.js";

export type Product = {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean;
}

export const newProductSchema = Joi.object().keys({
    imagem: Joi.string().allow(null).base64().default(null),
    nome: Joi.string().required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().required(),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.boolean().only().allow(true).default(true)
})

export const updateProductSchema = Joi.object().keys({
    imagem: Joi.alternatives().try(
        Joi.string().allow(null).base64(),
        Joi.string().uri().allow(null),
    ).allow(null).default(null),
    nome: Joi.string().required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().required(),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.boolean().required()
})

export const searchQuerySchema = Joi.object().keys({
    categoriaId: Joi.string().required()
})