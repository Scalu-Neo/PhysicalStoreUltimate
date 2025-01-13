import {Repository, DataSource} from 'typeorm';
import {Store} from '../entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class StoreRepository {
    
    constructor(
        @InjectRepository(Store)private storeRepository: Repository<Store>
    ){}

    async findAll():Promise<Store[]>{
        return await this.storeRepository.find();
    }

    async findById(id: string):Promise<Store | null>{
        return await this.storeRepository.findOne({
            where: {storeId:id}
        });
    }
    
    async findByState(state: string): Promise<Store[] | null> {
        const query = this.storeRepository
          .createQueryBuilder('store')
          .where('store.state = :state', { state });
        
        console.log('Consulta SQL gerada:', query.getQuery());  // Verifique a consulta SQL gerada
        
        return await query.getMany();
      }
      
      

    async insertOne(dataStore: Store):Promise<Store | null>{
        return await this.storeRepository.save(dataStore);
    }
    
}
