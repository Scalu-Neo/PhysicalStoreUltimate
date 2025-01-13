import { Store } from "../entities/store.entity";
import { IFreightStrategy } from "./freigth.stategy.interface";

export interface IFreigthStrategyFactory {
    
    createFreigthStrategy(store: Store, distance: number): IFreightStrategy;
}