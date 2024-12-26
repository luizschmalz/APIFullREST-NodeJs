import { Company } from "../models/company.model";
import { NotFoundError } from "../errors/not-found.error";
import { CompanyRepository } from "../repositories/company.repositories";

export class CompanyService {

    private companyRepository : CompanyRepository;

    constructor(){
        this.companyRepository = new CompanyRepository();
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
        this.companyRepository.createCompany(company)
    }

    async updateCompany(companyId: string, company: Company) : Promise<void>{

        const _company = await this.companyRepository.getById(companyId)
        if(!_company){
            throw new NotFoundError('Company not found')
        }
        
        _company.logomarca = company.logomarca;
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

}