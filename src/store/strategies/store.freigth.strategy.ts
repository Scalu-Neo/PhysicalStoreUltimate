import { Inject, Injectable } from "@nestjs/common";
import { FreightDTO } from "src/apis/correios/dto/correios.dto";
import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";
import { ICorreiosService } from "src/apis/correios/interface/correios.service.interface";
import { IFreightStrategy } from "../interface/freigth.stategy.interface";

@Injectable()
export class LojaFreightStrategy implements IFreightStrategy{

    constructor(@Inject('CorreiosService')private readonly serviceFreigthCorreios: ICorreiosService){}

    async calculateFreigth(dataOrder: IFreightOrder): Promise<FreightDTO[]> {

        const responseFreigth: FreightDTO[] = await this.serviceFreigthCorreios.
        freightPriceTerm(dataOrder);
        console.log('Resposta do Correios:', responseFreigth);
        return responseFreigth;
    }
    
}