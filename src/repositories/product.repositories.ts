import { Product, productConverter } from "../models/product.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class  ProductRepository{

    private collection: CollectionReference<Product>

    constructor(){
        this.collection = getFirestore().collection('products').withConverter(productConverter)
    }

    async getAll(): Promise<Product[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => doc.data())
    }

    async getById(productId: string): Promise<Product | null> {
        const doc = await this.collection.doc(productId).get();
        return doc.data() ?? null;
    }

    async search(categoriaId: string) : Promise<Product[]>{
        const snapshot = await this.collection.where('categoria.id', '==', categoriaId).get()
        return snapshot.docs.map(doc => doc.data())
    }

    async createProduct(product: Product): Promise<void> {
        await this.collection.add(product)
    }

    
    async updateProduct(product: Product): Promise<void> {
        await this.collection.doc(product.id).set(product)
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.collection.doc(productId).delete()
    }

    async getCountByCategory(categoryId: string): Promise<number> {
        const countSnapshot = await this.collection.where('categoria.id', '==', categoryId).count().get()
        return countSnapshot.data().count
    }
}