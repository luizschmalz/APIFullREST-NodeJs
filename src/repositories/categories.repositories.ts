import { Category } from "../models/categories.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class CategoryRepository{

    private collection: CollectionReference

    constructor(){
        this.collection = getFirestore().collection('categories')
    }

    async getAll(): Promise<Category[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            descricao: doc.data().descricao,
            ativa: doc.data().ativa
        }}) as Category[];
    }

    async getById(categoryId: string): Promise<Category | null> {
        const doc = await this.collection.doc(categoryId).get();
        if (doc.exists) {
            return ({
                id: doc.id,
                descricao: doc.data()?.descricao,
                ativa: doc.data()?.ativa
            }) as Category;
        }else{
            return null
        }
       
    }

    async createCategory(category: Category): Promise<void> {
        await this.collection.add(category)
    }

    
    async updateCategory(category: Category): Promise<void> {
        let docRef = this.collection.doc(category.id!)
        delete category.id
        await docRef.set(category)
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.collection.doc(categoryId).delete()
    }
}