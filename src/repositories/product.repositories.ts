import { Product } from "../models/product.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class  ProductRepository{

    private collection: CollectionReference

    constructor(){
        this.collection = getFirestore().collection('products')
    }

    async getAll(): Promise<Product[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            nome: doc.data().nome,
            preco: doc.data().preco,
            descricao: doc.data().descricao,
            imagem: doc.data().imagem,
            categoria: doc.data().categoria,
            ativa: doc.data().ativa
        }}) as Product[];
    }

    async getById(productId: string): Promise<Product | null> {
        const doc = await this.collection.doc(productId).get();
        if (doc.exists) {
            return ({
                id: doc.id,
                nome: doc.data()?.nome,
                preco: doc.data()?.preco,
                descricao: doc.data()?.descricao,
                imagem: doc.data()?.imagem,
                categoria: doc.data()?.categoria,
                ativa: doc.data()?.ativa
            }) as Product;
        }else{
            return null
        }
    }

    async search(categoriaId: string) : Promise<Product[]>{
        const snapshot = await this.collection.where('categoria.id', '==', categoriaId).get()
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                nome: doc.data().nome,
                preco: doc.data().preco,
                descricao: doc.data().descricao,
                imagem: doc.data().imagem,
                categoria: doc.data().categoria,
                ativa: doc.data().ativa
            }}) as Product[];
        
    }

    async createProduct(product: Product): Promise<void> {
        await this.collection.add(product)
    }

    
    async updateProduct(product: Product): Promise<void> {
        let docRef = this.collection.doc(product.id!)
        delete product.id
        await docRef.set(product)
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.collection.doc(productId).delete()
    }

    async getCountByCategory(categoryId: string): Promise<number> {
        const countSnapshot = await this.collection.where('categoria.id', '==', categoryId).count().get()
        return countSnapshot.data().count
    }
}