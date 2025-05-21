import { Company, companyConverter } from "../models/company.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class CompanyRepository{

    private collection: CollectionReference<Company>

    constructor(){
        this.collection = getFirestore().collection('companies').withConverter(companyConverter)
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc =>  doc.data())
    }

    async getById(companyId: string): Promise<Company | null> {
        const doc = await this.collection.doc(companyId).get();
        return doc.data() ?? null;
       
    }

    async createCompany(company: Company): Promise<void> {
        await this.collection.add(company)
    }

    
    async updateCompany( company: Company): Promise<void> {
        await this.collection.doc(company.id).set(company)
    }
}