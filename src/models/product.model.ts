import { Joi } from "celebrate";
import { Category } from "./categories.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean;

    constructor(data: Product | any) {
        this.id = data.id;
        this.nome = data.nome;
        this.descricao = data.descricao;
        this.preco = data.preco;
        this.imagem = data.imagem;
        this.categoria = new Category(data.categoria);
        this.ativa = data.ativa ?? true; 
    }

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

export const productConverter: FirestoreDataConverter<Product> = {
    toFirestore: (product: Product): DocumentData => {
        return{
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: {
                id: product.categoria.id,
                descricao: product.categoria.descricao
            },
            ativa: product.ativa
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Product =>{
        return new Product({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}