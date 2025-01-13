import {IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class FreightDTO {

    @IsString()
    @IsNotEmpty()
    prazo: string;

    @IsString()
    @IsOptional()
    codProdutoAgencia?: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    description: string;

}