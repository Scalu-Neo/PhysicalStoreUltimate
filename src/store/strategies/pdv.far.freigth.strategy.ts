import { FreightDTO } from "src/apis/correios/dto/correios.dto";
import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";
import { IFreightStrategy } from "../interface/freigth.stategy.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PdvFarFreigthStrategy implements IFreightStrategy {

    async calculateFreigth(dataOrder: IFreightOrder): Promise<FreightDTO[]> {
        
        const responseFreigth: FreightDTO[] = [{
            prazo: "0", 
            price: "0",
            description: "Esta unidade de PDV não pode realizar entrega em sua localidade."
        }]

        return responseFreigth;
    }
   
}