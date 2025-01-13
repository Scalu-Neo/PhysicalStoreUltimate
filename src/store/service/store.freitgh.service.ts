import { Injectable, Inject } from "@nestjs/common";
import { IDistanceApiService } from "src/apis/googleMaps/interface/maps.distance.interface";
import { IViaCepService } from "src/apis/viaCep/interface/viacep.service.interface";
import { IFreigthStrategyFactory } from "../interface/freigth.factory.interface";
import { Store } from "../entities/store.entity";
import { ViaCepDTO } from "src/apis/viaCep/dto/viacep.dto";
import { IStoreDataFreigthDistance } from "../interface/store.freigth.interface";
import { createFreigthOrder } from '../../utils/freigth.utils'
import { IFreightOrder } from "src/apis/correios/interface/correios.response.interface";
import { IFreightStrategy } from "../interface/freigth.stategy.interface";
import { FreightDTO } from "src/apis/correios/dto/correios.dto";
import { IGoogleGeoCode } from "src/apis/googleGeoCode/interface/geoCode.interface";
import { CoordinatesDTO } from "src/apis/googleGeoCode/dto/coordinates.dto";
import { PinsDto } from "../dto/pin.dto";
import { StoresResponseDto } from "../dto/store.response.dto";

@Injectable()
export class StoreResponseDistanceFreigth {

    constructor(
        @Inject('ViaCepService') private readonly viaCepService: IViaCepService,
        @Inject('GoogleMapsApiService') private readonly googleMapsService: IDistanceApiService,
        @Inject('FreightStrategyFactory') private readonly freigthStrategyFactory: IFreigthStrategyFactory,
        @Inject('GoogleGeoCodeApi') private readonly dataCoordinates: IGoogleGeoCode
    ){}

    async processStores(originCep: string, stores: Store[]): Promise<StoresResponseDto> {

        const convertCepOrigin: ViaCepDTO = await this.viaCepService.findAddressCep(originCep);
        const { cep, logradouro, bairro, localidade, estado } = convertCepOrigin;
        const originAddress: string = `${logradouro}, ${bairro}, ${localidade} - ${estado}, ${cep}`;
    
        const resultResponse: IStoreDataFreigthDistance[] = [];
        let pins: PinsDto[] = []; 
    
        for (const store of stores) {
    
            const destinationCep: ViaCepDTO = await this.viaCepService.findAddressCep(store.postalCode);
            const { cep, logradouro, bairro, localidade, estado } = destinationCep;
    
            const destinationAddress: string = `${logradouro}, ${bairro}, ${localidade} - ${estado}, ${cep}`;
    
            const distance: number = await this.googleMapsService.getDistanceMatrix(originAddress, destinationAddress);
    
            const dynamicDataOrder: IFreightOrder = createFreigthOrder(originCep, store.postalCode);
    
            const freigthStrategy: IFreightStrategy = this.freigthStrategyFactory.createFreigthStrategy(store, distance);
            const freigthResult: FreightDTO[] = await freigthStrategy.calculateFreigth(dynamicDataOrder);
    
            resultResponse.push({
                name: store.storeName,
                city: destinationCep.localidade,
                postalCode: store.postalCode,
                type: store.type,
                distance: distance,
                value: freigthResult,
            });
    

            const coordinates: CoordinatesDTO = await this.dataCoordinates.getCoordinates(destinationAddress);
    
            pins.push({
                position: {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                },
                title: store.storeName,
            });
        }
    
        const responseStores: StoresResponseDto = {
            stores: resultResponse,
            pins: pins, 
            limit: stores.length, // Retornar o total de stores sem paginação
            offset: 0, // Não há mais offset por enquanto depois ajeito
            total: stores.length,
        };
    
        return responseStores;
    }
    
}
