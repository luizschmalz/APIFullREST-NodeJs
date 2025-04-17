import { User } from "../models/user.model.js";
import { CollectionReference, getFirestore } from "firebase-admin/firestore";

export class UserRepository{

    private collection: CollectionReference

    constructor(){
        this.collection = getFirestore().collection('users')
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }}) as User[];
    }

    async getById(userId: string): Promise<User | null> {
        const doc = await this.collection.doc(userId).get();
        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as User;
        }else{
            return null
        }
       
    }

    async createUser(user: User): Promise<void> {
        delete user.password
        await this.collection.add(user)
    }
    
    async updateUser( user: User): Promise<void> {
        let docRef = this.collection.doc(user.id)

        await docRef.set({
            name: user.name,
            email: user.email
        })
    }

    async deleteUser(userId: string): Promise<void> {
        this.collection.doc(userId).delete()
    }
}