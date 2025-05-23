import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class Company {
    id: string;
    logomarca: string;
    cpfCnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    horarioFuncionamento: string;
    endereco: string;
    localizacao: string;
    taxaEntrega: number;
    ativa: boolean;

    constructor(data: Company | any) {
        this.id = data.id;
        this.logomarca = data.logomarca;
        this.cpfCnpj = data.cpfCnpj;
        this.razaoSocial = data.razaoSocial;
        this.nomeFantasia = data.nomeFantasia;
        this.telefone = data.telefone;
        this.horarioFuncionamento = data.horarioFuncionamento;
        this.endereco = data.endereco;
        this.localizacao = data.localizacao;
        this.taxaEntrega = data.taxaEntrega;
        this.ativa = data.ativa ?? true; 
    }
}

export const newCompanySchema = Joi.object().keys({
    logomarca: Joi.string().allow(null).base64(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string().regex(/(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/).required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(), 
    ativa: Joi.boolean().only().allow(true).default(true)
})

export const updateCompanySchema = Joi.object().keys({
    logomarca: Joi.alternatives().try(
        Joi.string().allow(null).base64(),
        Joi.string().uri().allow(null),
    ).required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string().regex(/(^[1-9]{1}[0-9]{1}[0-9]{8}$)|(^[1-9]{1}[0-9]{1}[9]{1}[0-9]{8}$)/).required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(), 
    ativa: Joi.boolean().required()
})

export const companyConverter: FirestoreDataConverter<Company> = {
    toFirestore: (company: Company): DocumentData => {
        return ({
            logomarca: company.logomarca,
            cpfCnpj: company.cpfCnpj,
            razaoSocial: company.razaoSocial,
            nomeFantasia: company.nomeFantasia,
            telefone: company.telefone,
            horarioFuncionamento: company.horarioFuncionamento,
            endereco: company.endereco,
            localizacao: company.localizacao,
            taxaEntrega: company.taxaEntrega,
            ativa: company.ativa 
        })
    },
    fromFirestore:  (snapshot: QueryDocumentSnapshot): Company => {
        return new Company({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}