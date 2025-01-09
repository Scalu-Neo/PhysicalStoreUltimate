import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../repository/store.repository';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreService {
  
  constructor(private readonly storeRepository: StoreRepository){}

  async listAllStore():Promise<Store[]>{
    return await this.storeRepository.findAll();
  }

  async getById(id: string):Promise<Store | null>{
    return await this.storeRepository.findById(id);
  }

  async getByState(state: string):Promise<Store[] | null>{
    return await this.storeRepository.findByState(state);
  }

  async createStore(store: Store):Promise<Store>{
    return await this.storeRepository.insertOne(store);
  }

}
