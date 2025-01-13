import { StoreResponseDistanceFreigth } from "../service/store.freitgh.service";
import { PinsDto } from "./pin.dto";
import { IStoreDataFreigthDistance } from "../interface/store.freigth.interface";

export class StoresResponseDto  {

    stores: IStoreDataFreigthDistance[];
    pins: PinsDto[];
    limit: number;
    offset: number;
    total: number;
}