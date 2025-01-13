import { Injectable, BadRequestException } from '@nestjs/common';
import { ViaCepDTO } from 'src/apis/viaCep/dto/viacep.dto';
import { IViaCepValidationService } from '../../apis/viaCep/interface/viaCepApi.interface';

@Injectable()
export class ViaCepValidationService implements IViaCepValidationService {
  
  validateCepFormat(cep: string): void {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
      throw new BadRequestException('Formato de CEP inválido. Use o formato 52060-615 ou 52060615.');
    }
  }

  validateApiResponse(response: ViaCepDTO): void {
    if (response.erro) {
      throw new BadRequestException('CEP não encontrado.');
    }

    if (!response || !response.logradouro || !response.bairro || !response.localidade || !response.uf) {
      throw new BadRequestException('Resposta inválida da API ViaCep. Certifique-se de que o CEP existe e contém todos os dados necessários.');
    }

    if (!response.logradouro.trim() || !response.bairro.trim() || !response.localidade.trim() || !response.uf.trim()) {
      throw new BadRequestException('A resposta da API ViaCep contém dados incompletos ou inválidos.');
    }

    if (typeof response.logradouro !== 'string' || typeof response.bairro !== 'string' || typeof response.localidade !== 'string' || typeof response.uf !== 'string') {
      throw new BadRequestException('Dados de endereço inválidos retornados pela API ViaCep.');
    }
  }
}
