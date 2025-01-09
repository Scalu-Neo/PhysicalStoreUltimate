import { Module } from '@nestjs/common';
import { StoreController } from './controller/store.controller';
import { StoreService } from './service/store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreRepository } from './repository/store.repository';
import { Address } from 'src/adrress/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "",
      database: 'store_db',
      entities: [Store, Address],
      synchronize: true,
      charset: 'utf8mb4_unicode_ci',
      timezone: 'Z',
    }),
    TypeOrmModule.forFeature([Store]),
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
})
export class AppModule {}
