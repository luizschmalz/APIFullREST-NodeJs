import { User, userConverter } from "../models/user.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class UserRepository{

    private collection: CollectionReference<User>

    constructor(){
        this.collection = getFirestore().collection('users').withConverter(userConverter)
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => doc.data())
    }

    async getById(userId: string): Promise<User | null> {
        const doc = await this.collection.doc(userId).get();
        return doc.data() ?? null;
       
    }

    async createUser(user: User): Promise<void> {
        await this.collection.add(user)
    }
    
    async updateUser( user: User): Promise<void> {
        await this.collection.doc(user.id).set(user)
    }

    async deleteUser(userId: string): Promise<void> {
        this.collection.doc(userId).delete()
    }
}