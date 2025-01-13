import { ViaCepDTO } from "src/apis/viaCep/dto/viacep.dto";

export interface IViaCepValidationService {

    validateCepFormat(cep: string): void;
    validateApiResponse(response: ViaCepDTO): void
}