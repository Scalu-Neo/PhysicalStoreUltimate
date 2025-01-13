import { IsNotEmpty, Length, IsOptional, IsPostalCode } from "class-validator";

export class StoreDTO {

    @IsNotEmpty()
    @Length(1, 100)
    storeName: string;

    @IsNotEmpty()
    latitude: string;

    @IsNotEmpty()
    longitude: string;

    @IsNotEmpty()
    address1: string;

    @IsOptional()
    address2?: string;

    @IsOptional()
    address3?: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    district: string;

    @IsNotEmpty()
    @Length(3, 4)
    type: string;

    @IsOptional()
    country: string;

    @IsPostalCode('BR')
    @IsNotEmpty()   
    postalCode: string;

    @IsNotEmpty()
    @Length(11, 11)
    telephoneNumber: string;

    @IsOptional()
    @Length(10, 200)
    emailAddress?: string;

}