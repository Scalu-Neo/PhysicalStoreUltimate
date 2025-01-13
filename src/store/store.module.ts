import { Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { StoreServiceRepository } from './service/storeRepository.service';
import { StoreResponseDistanceFreigth } from './service/store.freitgh.service';
import { FreightStrategyFactory } from './factories/freigth.strategy.factory';
import { LojaFreightStrategy } from './strategies/store.freigth.strategy';
import { LojaMotoBoyStrategy } from './strategies/store.motoboy.freigth.strategy';
import { PdvFarFreigthStrategy } from './strategies/pdv.far.freigth.strategy';
import { PdvFreigthStrategy } from './strategies/pdv.freigth.strategy';
import { StoreRepository } from './repository/store.repository';
import { CorreiosModule } from '../apis/correios/correios.module';
import { GoogleMapsModule } from 'src/apis/googleMaps/googleMaps.module';
import { ViaCepModule } from 'src/apis/viaCep/viaCep.module';
import { GooGeoCodeModule } from 'src/apis/googleGeoCode/geoCode.module';
import { ViaCepService } from 'src/apis/viaCep/Service/viacep.service';
import { GoogleMapsApiService } from 'src/apis/googleMaps/service/maps.api.service';
import { GoogleGeoCodeApi } from 'src/apis/googleGeoCode/service/geoCode.service';
import { CorreiosService } from 'src/apis/correios/service/correiosService';
import { GoogleMapsResponseFormat } from 'src/apis/googleMaps/service/maps.distance.service';
import { HttpModule } from '@nestjs/axios';
import { FreightResponseFormatter } from '../apis/correios/service/ResponseFormatter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { ViaCepValidationService } from 'src/common/validations/viaCepApi';
import { GoogleMapsValidationService } from 'src/common/validations/googleMaps.Api';
import { GeoCodeValidationService } from '../common/validations/geoCode.Api';
import { CorreiosValidationService } from '../common/validations/correiosApi';


@Module({
  imports: [
    TypeOrmModule.forFeature([Store]),
    CorreiosModule,
    GoogleMapsModule,
    ViaCepModule,
    GooGeoCodeModule,
    HttpModule
  ],
  controllers: [StoreController],
  providers: [
    StoreServiceRepository,
    StoreRepository,
    StoreResponseDistanceFreigth,
    FreightStrategyFactory,
    LojaFreightStrategy,         // Estratégias de frete para lojas
    LojaMotoBoyStrategy,         // Estratégia de frete para loja com motoboy
    PdvFreigthStrategy,           // Estratégia de frete para PDV
    PdvFarFreigthStrategy, 
    {
        provide: 'ViaCepService',
        useClass: ViaCepService, 
      },
      {
        provide: 'GoogleMapsApiService',
        useClass: GoogleMapsApiService, 
      },
      {
        provide: 'GoogleMapsResponseFormat',
        useClass: GoogleMapsResponseFormat, 
      },
      {
        provide: 'FreightResponseFormatter',
        useClass: FreightResponseFormatter
      },

      {
        provide: 'FreightStrategyFactory',
        useClass: FreightStrategyFactory, 
      },
      {
        provide: 'GoogleGeoCodeApi',
        useClass: GoogleGeoCodeApi, 
      },
      {
        provide: 'LojaFreightStrategy',
        useClass: LojaFreightStrategy,
      },
      { 
        provide: 'LojaMotoBoyStrategy', 
        useClass: LojaMotoBoyStrategy,
      },
      { 
        provide: 'PdvFreigthStrategy', 
        useClass: PdvFreigthStrategy,
      },
      { 
        provide: 'PdvFarFreigthStrategy', 
        useClass: PdvFarFreigthStrategy,
      },
      { 
        provide: 'CorreiosService', 
        useClass: CorreiosService,
      },
      { 
        provide: 'ViaCepValidationService', 
        useClass: ViaCepValidationService,
      },
      { 
        provide: 'GoogleMapsValidation', 
        useClass: GoogleMapsValidationService
      },
      {
        provide: 'GeoCodeValidationService', 
        useClass: GeoCodeValidationService
      },
      {
        provide:'CorreiosValidationService', 
        useClass: CorreiosValidationService
      },
  ],
  exports: [StoreServiceRepository, StoreResponseDistanceFreigth, FreightStrategyFactory],  // Exportando serviços e fábricas para uso em outros módulos
})
export class StoreModule {}
