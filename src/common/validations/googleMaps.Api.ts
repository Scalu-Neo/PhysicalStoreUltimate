import { Injectable, BadRequestException } from '@nestjs/common';
import { GoogleMapsResponseDTO } from 'src/apis/googleMaps/dto/maps.dto';
import { IGoogleMapsValidationService } from './interface/googleMaps.interface';

@Injectable()
export class GoogleMapsValidationService implements IGoogleMapsValidationService {

  validateOriginsAndDestinations(origin: string, destination: string): void {
    if (!origin || !destination) {
      throw new BadRequestException('Os parâmetros de origem e destino são obrigatórios.');
    }

    if (typeof origin !== 'string' || typeof destination !== 'string') {
      throw new BadRequestException('Os parâmetros de origem e destino devem ser do tipo string.');
    }

    if (origin.trim() === '' || destination.trim() === '') {
      throw new BadRequestException('Os parâmetros de origem e destino não podem estar vazios.');
    }
  }

  validateResponse(response: GoogleMapsResponseDTO): void {
    if (!response.rows || response.rows.length === 0 || !response.rows[0].elements) {
      throw new BadRequestException('Resposta inválida da API. Não foi possível encontrar os dados de distância.');
    }

    const element = response.rows[0].elements[0];

    if (element.status !== 'OK') {
      throw new BadRequestException(`Erro ao calcular a distância: ${element.status}`);
    }

    if (!element.distance || !element.distance.value) {
      throw new BadRequestException('Distância não encontrada na resposta da API.');
    }
  }
}
