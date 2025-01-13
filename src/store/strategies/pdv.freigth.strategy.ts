import { Inject } from "@nestjs/common";
import { ICorreiosService } from "src/apis/correios/interface/correios.service.interface";
import { FreightDTO } from "src/apis/correios/dto/correios.dto";
import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";
import { IFreightStrategy } from "../interface/freigth.stategy.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PdvFreigthStrategy implements IFreightStrategy {

    constructor(@Inject('CorreiosService')private readonly serviceFreigthCorreios: ICorreiosService){}

    async calculateFreigth(dataOrder: IFreightOrder): Promise<FreightDTO[]> {
        
        const response: FreightDTO[] = await this.serviceFreigthCorreios.
        freightPriceTerm(dataOrder);

        const responseFreigth: FreightDTO[] = [{
            prazo: response[0].prazo, //Tô usando o prazo de entrega do Sedex API correios...
            price: "R$ 15,00",
            description: "Motoboy"
        }];
        
        return responseFreigth;
    }

}