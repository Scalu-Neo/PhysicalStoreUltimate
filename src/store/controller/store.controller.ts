import { Controller, Get } from '@nestjs/common';
import { StoreService} from '../service/store.service';

@Controller()
export class StoreController {
  constructor(private readonly appService: StoreService) {}

  @Get('/listAll')
  getAllStore(): string {
    return 'messi'
  }

  @Get('/storeByCep')
  getStoreCep():string {
    return 'cristiano ronaldo'
  }
}
