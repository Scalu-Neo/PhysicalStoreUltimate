import { Injectable, Inject, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { IFreightOrder } from 'src/apis/correios/interface/correios.response.interface';
import { ICorreiosValidationService } from './interface/correiosAPI.interface';


@Injectable()
export class CorreiosValidationService implements ICorreiosValidationService{
  

  async validateFreightOrder(value: IFreightOrder): Promise<IFreightOrder> {
   
    try {

      if (!value || !value.cepOrigem || !value.cepDestino || !value.peso) {
        throw new BadRequestException('Dados de frete inválidos.');
      }

      return value;
    } catch (error) {
      
      if (error.response) {
        throw new HttpException(
          `Erro na API dos Correios: ${error.response.data.mensagem || 'Conexão com a API não foi bem sucedida'}`,
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      } else if (error.request) {
        throw new HttpException(
          'Erro ao tentar se conectar com a API dos Correios. Verifique a conexão(Rede).',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

    }
  }
}
