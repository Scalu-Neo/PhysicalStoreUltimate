import { Injectable } from "@nestjs/common";
import { IResponseFormatter } from "../interface/correios.IresponseForm";
import { FreightDTO } from "../dto/correios.dto";

@Injectable()
export class FreightResponseFormatter implements IResponseFormatter {
    
    
    responseFormatter(dataResponse: FreightDTO[]): FreightDTO[] {

        console.log('Dados antes da formatação:', dataResponse);
        
        const formmatterResponse: FreightDTO[] = dataResponse.map(item =>({
            prazo: item.prazo,
            codProdutoAgencia: item.codProdutoAgencia,
            price: item.price,
            description: item.description
        }));

        return formmatterResponse;
    }


}