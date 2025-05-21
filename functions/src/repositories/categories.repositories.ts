import { Category, categoryConverter } from "../models/categories.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class CategoryRepository{

    private collection: CollectionReference<Category>

    constructor(){
        this.collection = getFirestore().collection('categories').withConverter(categoryConverter)
    }

    async getAll(): Promise<Category[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => doc.data())
    }

    async getById(categoryId: string): Promise<Category | null> {
        const doc = await this.collection.doc(categoryId).get();
        return doc.data() ?? null;
       
    }

    async createCategory(category: Category): Promise<void> {
        await this.collection.add(category)
    }

    
    async updateCategory(category: Category): Promise<void> {
        await this.collection.doc(category.id).set(category)
    }

    async deleteCategory(categoryId: string): Promise<void> {
        await this.collection.doc(categoryId).delete()
    }
}