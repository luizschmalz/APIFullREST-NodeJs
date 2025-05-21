import { Company } from "../models/company.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { CompanyRepository } from "../repositories/company.repositories.js";
import { UploadFileService } from "./upload-file.service.js";
import { ValidationError } from "../errors/validation.error.js";

export class CompanyService {

    private companyRepository : CompanyRepository;
    private uploadFileService : UploadFileService;

    constructor(){
        this.companyRepository = new CompanyRepository();
        this.uploadFileService = new UploadFileService("images/companies");
    }

    async getAll(): Promise<Company[]>{
        return this.companyRepository.getAll();
    }

    async getById(companyId: string) : Promise<Company>{
        const company = await this.companyRepository.getById(companyId)
        if(!company){
            throw new NotFoundError('Company not found')
        }

        return company
    }

    async createCompany(company: Company) : Promise<void>{
        const logomarcaUrl = await this.uploadFileService.upload(company.logomarca)
        company.logomarca = logomarcaUrl
        this.companyRepository.createCompany(company)
    }

    async updateCompany(companyId: string, company: Company) : Promise<void>{

        const _company = await this.companyRepository.getById(companyId)
        if(!_company){
            throw new NotFoundError('Company not found')
        }
        
        if (!this.isValidUrl(company.logomarca)) {
            _company.logomarca = await this.uploadFileService.upload(company.logomarca)
        }

        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativa = company.ativa;

        await this.companyRepository.updateCompany(_company)
       
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