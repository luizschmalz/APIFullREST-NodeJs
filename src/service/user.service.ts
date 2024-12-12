import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repositories";
import { AuthService } from "./auth.service";

export class UserService {

    private userRepository: UserRepository;
    private authService : AuthService;

    constructor(){
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
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
        const userAuth = await this.authService.create(user) 
        user.id = userAuth.uid 
        this.userRepository.updateUser(user)
    }

    async updateUser(userId: string, user: User) : Promise<void>{

        const _user = await this.userRepository.getById(userId)
        if(!_user){
            throw new NotFoundError('User not found')
        }
        
        _user.name = user.name  
        _user.email = user.email

        await this.authService.update(userId, user)
        await this.userRepository.updateUser(_user)
       
    }

    async deleteUser(userId:string): Promise<void>{
        await this.authService.delete(userId)
        await this.userRepository.deleteUser(userId)
    }

}