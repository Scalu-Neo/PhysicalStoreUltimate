import { ViaCepDTO } from "../dto/viacep.dto";

export interface IViaCepService {

    findAddressCep(cep: string):Promise<ViaCepDTO>;
}