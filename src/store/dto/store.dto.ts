import { IsNotEmpty, Length, IsOptional } from "class-validator";
import { AddressDTO } from "src/adrress/dto/address.dto";

export class StoreDTO {

    @IsNotEmpty()
    @Length(3, 100)
    storeName: string;

    @IsNotEmpty()
    @Length(3, 4)
    type: string;

    @IsNotEmpty()
    @Length(11, 11)
    telephoneNumber: string;

    @IsOptional()
    @Length(10, 200)
    email?: string;

    @IsNotEmpty()
    @Length(8, 8)
    cep: AddressDTO;

}