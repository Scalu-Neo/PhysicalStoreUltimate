import { Module, forwardRef } from '@nestjs/common';
import { CorreiosService } from './service/correiosService';
import { FreightResponseFormatter } from './service/ResponseFormatter';
import { HttpModule} from '@nestjs/axios';
import { CorreiosValidationService } from 'src/common/validations/correiosApi';


@Module({
    imports: [HttpModule],
    providers: [
        CorreiosService,
        {provide:'CorreiosValidationService', useClass: CorreiosValidationService},
        { provide: 'FreightResponseFormatter', useClass: FreightResponseFormatter },
    ],
    exports: [CorreiosService],
})
export class CorreiosModule {}