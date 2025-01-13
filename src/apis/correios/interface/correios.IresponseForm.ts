import { FreightDTO } from "../dto/correios.dto";

export interface IResponseFormatter {

    responseFormatter(dataResponse: FreightDTO[]):FreightDTO[];
}