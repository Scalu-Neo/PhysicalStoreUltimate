import {Repository, DataSource} from 'typeorm';
import {Store} from '../entities/store.entity';

export class StoreRepository {
    
    constructor(private storeRepository: Repository<Store>){}

    async findAll():Promise<Store[]>{
        return await this.storeRepository.find();
    }

    async findById(id: string):Promise<Store | null>{
        return await this.storeRepository.findOne({
            where: {storeId:id}
        });
    }

    async findByState(state: string): Promise<Store[] | null> {
        return await this.storeRepository
          .createQueryBuilder('store')
          .where('store.state = :state', { state })
          .getMany();  
      }

    async insertOne(dataStore: Store):Promise<Store | null>{
        return await this.storeRepository.save(dataStore);
    }
}
