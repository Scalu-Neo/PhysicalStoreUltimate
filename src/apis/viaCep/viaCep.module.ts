import { Module } from '@nestjs/common';
import { ViaCepService } from './Service/viacep.service';
import { HttpModule } from '@nestjs/axios';
import { ViaCepValidationService } from 'src/common/validations/viaCepApi';

@Module({
    imports: [HttpModule],
    providers: [ViaCepService,
        {provide: 'ViaCepValidationService', useClass: ViaCepValidationService},
    ],
    exports: [ViaCepService],
}) export class ViaCepModule {}