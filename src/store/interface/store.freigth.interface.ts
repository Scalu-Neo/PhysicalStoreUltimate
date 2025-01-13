import { FreightDTO } from "src/apis/correios/dto/correios.dto";

export interface IStoreDataFreigthDistance {

    name: string,
    city: string,
    postalCode: string,
    type: string,
    distance: number,
    value: FreightDTO[] 
}