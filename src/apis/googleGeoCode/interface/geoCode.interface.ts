import { CoordinatesDTO } from "../dto/coordinates.dto";

export interface IGoogleGeoCode {

    getCoordinates(address: string):Promise<CoordinatesDTO>;
}