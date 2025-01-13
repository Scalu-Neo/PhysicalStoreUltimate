import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { IGoogleGeoCode } from "../interface/geoCode.interface";
import { CoordinatesDTO } from "../dto/coordinates.dto";
import { firstValueFrom } from "rxjs";
import { GeoCodeResponseDTO } from "../dto/geoCode.dto";
import { IGoogleGeoCodeValidation } from "src/common/validations/interface/geoCode.interface";

@Injectable()
export class GoogleGeoCodeApi implements IGoogleGeoCode {

    private readonly geoCodeApiKey: string = 'AIzaSyDLkCf99btsjWiURUu-q3YpqdEW9Wd7m5s';

    constructor(
        private readonly httpService: HttpService,
        @Inject('GeoCodeValidationService')private readonly geoCodeValitaditon: IGoogleGeoCodeValidation) {}

    async getCoordinates(address: string): Promise<CoordinatesDTO> {

        const encodedAddress: string = encodeURIComponent(address);
        const url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.geoCodeApiKey}`;

        try {
            const response: AxiosResponse<GeoCodeResponseDTO> = await firstValueFrom(this.httpService.get(url));

            this.geoCodeValitaditon.validateGeoCodeResponse(response.data);
           
            const result = response.data.results[0];
            const location = result.geometry.location;

            const coordinates: CoordinatesDTO = {
                latitude: location.lat,
                longitude: location.lng,
            };

            return coordinates;
        } catch (error) {
            console.error('Erro ao acessar a API do GoogleGeoCode:', error.message);
            throw new Error(`Erro ao obter coordenadas: ${error.message}`);
        }
    }
}
