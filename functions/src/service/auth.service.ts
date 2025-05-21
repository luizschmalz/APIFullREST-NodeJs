import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-alredy-exists.errors.js";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { User } from "../models/user.model.js";
import {FirebaseAuthError, getAuth, UpdateRequest, UserRecord} from 'firebase-admin/auth'
import {signInWithEmailAndPassword, getAuth as getFirebaseAuth, UserCredential, sendPasswordResetEmail, signInAnonymously} from 'firebase/auth'

export class AuthService {
    
    async create(user: User): Promise<UserRecord>{
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.name,
        }).catch(err => {
            if(err instanceof FirebaseAuthError && err.code === 'auth/email-already-exists'){
                throw new EmailAlreadyExistsError()
            }
            throw err
        })
    }

    async update(id:string, user: User){
        const props: UpdateRequest = {
            displayName: user.name,
            email: user.email
        }

        if(user.password){
            props.password = user.password
        }

        await getAuth().updateUser(id, props)
    }

    async delete(id:string){
        getAuth().deleteUser(id)
    }

    async login(email:string, password:string): Promise<UserCredential>{
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
        .catch(err => {
            if(err instanceof FirebaseError && err.code === 'auth/invalid-credential'){
                throw new UnauthorizedError()
            }
            throw err
        })
    }

    async recovery(email: string){
        await sendPasswordResetEmail(getFirebaseAuth(), email)
    }

    async signin(): Promise<UserCredential>{
        return await signInAnonymously(getFirebaseAuth())
    }
}

