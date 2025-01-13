import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";

export const createFreigthOrder = (cepOrigem: string, cepDestino: string): IFreightOrder => {
    const newFreigthOrder: IFreightOrder = {
        
        servico: '34321',
        cepDestino: cepDestino,
        cepOrigem: cepOrigem, 
        peso: '10',
        formato: '1',
        comprimento: "20",
        largura: "15",
        altura: "10",
        valorDeclarado: '25',
        diametro: '0',
        maoPropria: 'N',
        avisoRecebimento: 'N' 
    };

    return newFreigthOrder;
}
