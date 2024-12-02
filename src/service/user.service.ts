import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {

    async getAll(): Promise<User[]>{
        const snapshot = await getFirestore().collection('users').get()
        return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }}) as User[];
    }

    async getById(userId: string) : Promise<User>{
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            return ({
                id: doc.id,
                ...doc.data()
            }) as User;
        }else{
            throw new NotFoundError('User not found')
        }
       
    }

    async createUser(user: User) : Promise<void>{
        
        await getFirestore().collection('users').add(user)

    }

    async updateUser(userId: string, user: User) : Promise<void>{

        let docRef = getFirestore().collection('users').doc(userId)

        if ((await docRef.get()).exists) {
            await docRef.set({
                name: user.name,
                email: user.email
            })
        }else{
            throw new NotFoundError('User not found')
        }
    }

    async deleteUser(userId:string): Promise<void>{
        await getFirestore().collection('users').doc(userId).delete()
    }

}