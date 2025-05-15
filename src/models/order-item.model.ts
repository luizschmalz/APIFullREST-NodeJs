import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { Product } from './product.model.js';
import {Joi} from 'celebrate';

export class OrderItem  {
    id: string;
    produto: Product
    quantidade: number;
    observacao: string;

    constructor(data: OrderItem | any) {
        this.id = data.id;
        this.produto = data.produto;
        this.quantidade = data.quantidade;
        this.observacao = data.observacao ?? null;
    }

    getTotal(): number {
        return this.produto.preco * this.quantidade;
    }
}

export const orderItemSchema: Joi.ObjectSchema = Joi.object().keys({
    produto: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    quantidade: Joi.number().integer().min(1).required(),
    observacao: Joi.string().allow(null).default(null)
})

export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
    toFirestore:  (item: OrderItem): DocumentData  =>{
        return {
            produto: {
                id: item.produto.id,
                nome: item.produto.nome,
                descricao: item.produto.descricao,
                preco: item.produto.preco,
                imagem: item.produto.imagem,
                categoria: {
                    id: item.produto.categoria.id,
                    descricao: item.produto.categoria.descricao
                },
            },
            quantidade: item.quantidade,
            observacao: item.observacao,
        }
    },
    fromFirestore:  (snapshot: QueryDocumentSnapshot): OrderItem => {
       return new OrderItem({
            id: snapshot.id,
            ...snapshot.data()
       })
    }
}