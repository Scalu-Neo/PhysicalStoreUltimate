import { FreightDTO } from "src/apis/correios/dto/correios.dto";
import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";

export interface IFreightStrategy {

    calculateFreigth(dataOrder:IFreightOrder):Promise<FreightDTO[]>;
}