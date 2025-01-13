import { Module } from '@nestjs/common';
import { GoogleMapsApiService } from './service/maps.api.service';
import { GoogleMapsResponseFormat } from './service/maps.distance.service';
import { HttpModule } from '@nestjs/axios';
import { GoogleMapsValidationService } from 'src/common/validations/googleMaps.Api';

@Module({
    imports: [HttpModule],
    providers: [GoogleMapsApiService, 
        {provide: 'GoogleMapsValidation', useClass: GoogleMapsValidationService},
        {provide: 'GoogleMapsResponseFormat', useClass: GoogleMapsResponseFormat}
    ],
    exports: [GoogleMapsApiService],
})
export class GoogleMapsModule {}