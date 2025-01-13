import { Inject, Injectable } from "@nestjs/common";
import { IViaCepService } from "../interface/viacep.service.interface";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { firstValueFrom } from "rxjs";
import { BadRequestException } from "@nestjs/common";
import { ViaCepDTO } from "../dto/viacep.dto";
import { IViaCepValidationService } from "src/apis/viaCep/interface/viaCepApi.interface";

@Injectable()
export class ViaCepService implements IViaCepService{

    constructor(
        private readonly httpService: HttpService,
        @Inject('ViaCepValidationService')private readonly viaCepValidation: IViaCepValidationService,
    ){}

    async findAddressCep(cep: string): Promise<ViaCepDTO> {

        this.viaCepValidation.validateCepFormat(cep);

        try{
            const response: AxiosResponse<ViaCepDTO> = await firstValueFrom(
            this.httpService.get(`https://viacep.com.br/ws/${cep}/json`));

            this.viaCepValidation.validateApiResponse(response.data);

            return response.data;
        }catch (error) {
            throw new BadRequestException(`Erro ao acessar a API ViaCep: ${error.message}`);
         }
    }
}