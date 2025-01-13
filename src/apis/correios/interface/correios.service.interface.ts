import { IFreightOrder } from "./correios.response.interface";
import { FreightDTO } from "../dto/correios.dto";

export interface ICorreiosService {

    freightPriceTerm(dataOrder: IFreightOrder):Promise<FreightDTO[]>;
}