import { Category } from "../models/categories.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { CategoryRepository } from "../repositories/categories.repositories.js";

export class CategoryService {

    private categoryRepository : CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async getAll(): Promise<Category[]>{
        return this.categoryRepository.getAll();
    }

    async getById(categoryId: string) : Promise<Category>{
        const category = await this.categoryRepository.getById(categoryId)
        if(!category){
            throw new NotFoundError('Category not found')
        }

        return category
    }

    async createCategory(category: Category) : Promise<void>{
        this.categoryRepository.createCategory(category)
    }

    async updateCategory(categoryId: string, category: Category) : Promise<void>{

        const _category = await this.categoryRepository.getById(categoryId)
        if(!_category){
            throw new NotFoundError('Category not found')
        }
        

        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this.categoryRepository.updateCategory(_category)
       
    }

    async deleteCategory(categoryId: string) : Promise<void>{
        const category = await this.categoryRepository.getById(categoryId)
        if(!category){
            throw new NotFoundError('Category not found')
        }

        await this.categoryRepository.deleteCategory(categoryId)
    }
}