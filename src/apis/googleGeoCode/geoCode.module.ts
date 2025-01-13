import { Module } from '@nestjs/common';
import { GoogleGeoCodeApi } from './service/geoCode.service';
import { HttpModule } from '@nestjs/axios';
import { GeoCodeValidationService } from 'src/common/validations/geoCode.Api';

@Module({
    imports:[HttpModule],
    providers:[GoogleGeoCodeApi, 
        {provide: 'GeoCodeValidationService', useClass: GeoCodeValidationService}
    ],
    exports:[GoogleGeoCodeApi],
})
export class GooGeoCodeModule {}