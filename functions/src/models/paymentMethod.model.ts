import {Joi} from 'celebrate'
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export class PaymentMethod {
    id: string;
    descricao: string;
    ativa: boolean;

    constructor(data: PaymentMethod | any) {
        this.id = data.id;
        this.descricao = data.descricao;
        this.ativa = data.ativa ?? true; 
    }
}

export const newPaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().required().min(3),
    ativa: Joi.boolean().only().allow(true).default(true),
})

export const updatePaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().required().min(3),
    ativa: Joi.boolean().required(),
})

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
    toFirestore: (paymentMethod: PaymentMethod): DocumentData => {
        return {
            descricao: paymentMethod.descricao,
            ativa: paymentMethod.ativa,
        };
    },
    fromFirestore:  (snapshot: QueryDocumentSnapshot): PaymentMethod => {
        return new PaymentMethod({
            id: snapshot.id,
            ...snapshot.data(),
        })
    }
}