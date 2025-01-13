import { Module } from '@nestjs/common';
import { StoreController } from './store/controller/store.controller';
import { StoreServiceRepository } from './store/service/storeRepository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store/entities/store.entity';
import { StoreRepository } from './store/repository/store.repository';
import { CorreiosModule } from 'src/apis/correios/correios.module';
import { GoogleMapsModule } from 'src/apis/googleMaps/googleMaps.module';
import { ViaCepModule } from 'src/apis/viaCep/viaCep.module';
import { GooGeoCodeModule } from 'src/apis/googleGeoCode/geoCode.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "",
      database: 'store_db',
      entities: [Store],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
      timezone: 'Z',
    }),
    TypeOrmModule.forFeature([Store]),
    CorreiosModule,
    GoogleMapsModule,
    ViaCepModule,
    GooGeoCodeModule,
    StoreModule,
  ],
  controllers: [StoreController],
  providers: [
    StoreServiceRepository, 
    StoreRepository,
  ],
  exports: [StoreRepository]
})
export class AppModule {}
