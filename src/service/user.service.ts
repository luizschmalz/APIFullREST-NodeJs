import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repositories";

export class UserService {

    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async getAll(): Promise<User[]>{
        return this.userRepository.getAll();
    }

    async getById(userId: string) : Promise<User>{
        const user = await this.userRepository.getById(userId)
        if(!user){
            throw new NotFoundError('User not found')
        }

        return user
    }

    async createUser(user: User) : Promise<void>{
        
        this.userRepository.createUser(user)
    }

    async updateUser(userId: string, user: User) : Promise<void>{

        const _user = await this.userRepository.getById(userId)
        if(!_user){
            throw new NotFoundError('User not found')
        }
        
        _user.name = user.name  
        _user.email = user.email

        this.userRepository.updateUser(_user)
       
    }

    async deleteUser(userId:string): Promise<void>{
        this.userRepository.deleteUser(userId)
    }

}