import { Inject, Injectable } from "@nestjs/common"; 
import { Store } from "../entities/store.entity";
import { IFreightStrategy } from "../interface/freigth.stategy.interface";
import { IFreigthStrategyFactory } from "../interface/freigth.factory.interface";

@Injectable()
export class FreightStrategyFactory implements IFreigthStrategyFactory{

    constructor(
        @Inject('LojaFreightStrategy')private readonly lojaFreightStrategy: IFreightStrategy,
        @Inject('PdvFreigthStrategy')private readonly pdvFreightStrategy: IFreightStrategy,
        @Inject('LojaMotoBoyStrategy')private readonly lojaMotoBoyStrategy: IFreightStrategy,
        @Inject('PdvFarFreigthStrategy')private readonly pdvFarFreigthStrategy: IFreightStrategy,
    ) {}

    createFreigthStrategy(store: Store, distance: number): IFreightStrategy {

        const storeType = store.type.toUpperCase();
        
        if (storeType === 'LOJA') {
            if (distance > 50) {
                return this.lojaFreightStrategy; 
            } else {
                return this.lojaMotoBoyStrategy; 
            }
        } else if (storeType === 'PDV') {
            if (distance > 50) {       
                return this.pdvFarFreigthStrategy; 
            } else {
                return this.pdvFreightStrategy; 
            }
        } else {
            throw new Error(`Invalid store type: ${store.type} for store: ${store.storeName}`);
        }
    }
    
    

}