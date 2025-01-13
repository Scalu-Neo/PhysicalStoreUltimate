import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { IDistanceApiService } from "../interface/maps.distance.interface";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import {AxiosResponse} from "axios";
import { BadRequestException } from "@nestjs/common"; 
import { GoogleMapsResponseDTO } from "../dto/maps.dto";
import { IGoogleMapsResponseFormatter } from "../interface/maps.service.interface";
import { IGoogleMapsValidationService } from "src/common/validations/interface/googleMaps.interface";


@Injectable()
export class GoogleMapsApiService implements IDistanceApiService{

    private readonly googleMapsApiKey: string = 'AIzaSyBL9M0kER5x-j2CqIZAbIJVs7BD4qwf35g';
    constructor(
        private readonly httpService: HttpService, 
        @Inject('GoogleMapsValidation')private readonly googleMapsValidation: IGoogleMapsValidationService,
        @Inject('GoogleMapsResponseFormat')private readonly formartGoogleResponse: IGoogleMapsResponseFormatter){}

    async getDistanceMatrix(origin: string, destination: string): Promise<number> {
        
        this.googleMapsValidation.validateOriginsAndDestinations(origin, destination);

        const originEncoded: string = encodeURIComponent(origin);
        const destinationEncoded: string = encodeURIComponent(destination);

        const url: string = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originEncoded}&destinations=${destinationEncoded}&units=metric&key=${this.googleMapsApiKey}`;
        
        try {

        const response: AxiosResponse<GoogleMapsResponseDTO> = await firstValueFrom(this.httpService.get(url));
        this.googleMapsValidation.validateResponse(response.data);
        const responseFormat: number = (this.formartGoogleResponse.formatResponseDistance(response.data))/1000;

        return responseFormat;
        }catch (error) {
            throw new BadRequestException(`Erro ao acessar a API do Google Maps: ${error.message}`);
          }
        
    }

    
}