import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";

export interface ICorreiosValidationService {
    validateFreightOrder(value: IFreightOrder): Promise<IFreightOrder>
}