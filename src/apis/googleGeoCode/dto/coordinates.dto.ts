import { IsNotEmpty, IsNumber } from "class-validator";

export class CoordinatesDTO {
    
    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

}