import { Product } from "../models/product.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { ProductRepository } from "../repositories/product.repositories.js";
import { CategoryRepository } from "../repositories/categories.repositories.js";
import { UploadFileService } from "./upload-file.service.js";
import { ValidationError } from "../errors/validation.error.js";

export class ProductService {

    private productRepository : ProductRepository;
    private categoryRepository: CategoryRepository;
    private uploadService: UploadFileService

    constructor(){
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.uploadService = new UploadFileService('images/products/');
    }

    async getAll(): Promise<Product[]>{
        return this.productRepository.getAll();
    }

    async getById(productId: string) : Promise<Product>{
        const product = await this.productRepository.getById(productId)
        if(!product){
            throw new NotFoundError('Product not found')
        }

        return product
    }

    async createProduct(product: Product) : Promise<void>{
        if (!product.categoria?.id) {
            throw new Error('Category ID is required');
        }
        product.categoria = await this.validateCategory(product.categoria.id);
        if(product.imagem) {
            product.imagem = await this.uploadService.upload(product.imagem)
        }
        this.productRepository.createProduct(product)
    }

    async updateProduct(productId: string, product: Product) : Promise<void>{

        const _product = await this.productRepository.getById(productId)
        if(!_product){
            throw new NotFoundError('Product not found')
        }

        if (!product.categoria?.id) {
            throw new Error('Category ID is required');
        }
        const categoria = await this.validateCategory(product.categoria.id);

        if (product.imagem && !this.isValidUrl(product.imagem)) {
            product.imagem = await this.uploadService.upload(product.imagem)
        }
        

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.imagem = product.imagem;
        _product.categoria = categoria;
        _product.preco = product.preco;
        _product.ativa = product.ativa;

        await this.productRepository.updateProduct(_product)
       
    }

    async deleteProduct(productId: string) : Promise<void>{
        const product = await this.productRepository.getById(productId)
        if(!product){
            throw new NotFoundError('Product not found')
        }

        await this.productRepository.deleteProduct(productId)
    }

    private async validateCategory(categoryId: string){
        const category = await this.categoryRepository.getById(categoryId);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        return category;
    }

    private isValidUrl(urlStr: string): boolean {
            try {
                const url = new URL(urlStr);
                console.log(url.host)
                if (url.host !== "firebasestorage.googleapis.com") {
                    console.log("aqui")
                    throw new ValidationError("Invalid URL");
                }
                return true;
            } catch (error) {
                if (error instanceof ValidationError) {
                    throw error 
                }
                return false;  
            }
        }
}