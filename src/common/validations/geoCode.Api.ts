import { Injectable, BadRequestException } from '@nestjs/common';
import { GeoCodeResponseDTO } from 'src/apis/googleGeoCode/dto/geoCode.dto';
import { IGoogleGeoCodeValidation } from './interface/geoCode.interface';

@Injectable()
export class GeoCodeValidationService implements IGoogleGeoCodeValidation{

  validateGeoCodeResponse(response: GeoCodeResponseDTO): void {
   
    if (!response.results || response.results.length === 0) {
      throw new BadRequestException('Nenhum resultado encontrado para o endereço fornecido');
    }
    const result = response.results[0];
    if (!result.geometry || !result.geometry.location) {
      throw new BadRequestException('A resposta da API não contém dados de localização válidos');
    }
    const location = result.geometry.location;
    if (typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      throw new BadRequestException('Latitude ou longitude inválida na resposta da API');
    }
  }

}
