import { Injectable} from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { ICorreiosService } from "../interface/correios.service.interface";
import { FreightDTO } from "../dto/correios.dto";
import { IFreightOrder } from "../interface/correios.response.interface";
import { firstValueFrom } from "rxjs";
import { IResponseFormatter } from "../interface/correios.IresponseForm";
import { ICorreiosValidationService } from "src/common/validations/interface/correiosAPI.interface";

@Injectable()
export class CorreiosService implements ICorreiosService {

    constructor(
        private readonly httpService: HttpService, 
        @Inject('CorreiosValidationService')private readonly correiosValidationService: ICorreiosValidationService,
        @Inject('FreightResponseFormatter')private readonly responseFormatter: IResponseFormatter){}

    async freightPriceTerm(dataOrder: IFreightOrder): Promise<FreightDTO[]> {

        await this.correiosValidationService.validateFreightOrder(dataOrder);
        const response: AxiosResponse<FreightDTO[]> = await firstValueFrom(
            this.httpService.
            post('https://www.correios.com.br/@@precosEPrazosView', dataOrder));

            console.log('Resposta da API dos Correios:', response.data);
        return this.responseFormatter.responseFormatter(response.data);
    }

   
}