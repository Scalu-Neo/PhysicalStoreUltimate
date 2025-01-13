/*import { Module, forwardRef} from '@nestjs/common';
import { CorreiosValidationService } from 'src/common/validations/correiosApi';  // Ajuste o caminho conforme necessário
import { CorreiosService } from 'src/apis/correios/service/correiosService';  // CorreiosService
import { FreightResponseFormatter } from 'src/apis/correios/service/ResponseFormatter';  // Se precisar de outros serviços
import { CorreiosModule } from 'src/apis/correios/correios.module';

@Module({
  imports: [
    CorreiosModule,
  ],
  providers: [
    CorreiosValidationService,  // CorreiosValidationService será fornecido aqui
    CorreiosService,  // Dependência do CorreiosValidationService
    { provide: 'FreightResponseFormatter', useClass: FreightResponseFormatter }  // Outros providers, se necessário
  ],
  exports: [
    CorreiosValidationService  // Expondo o CorreiosValidationService para uso em outros módulos
  ]
})
export class ValidationsModule {}*/
