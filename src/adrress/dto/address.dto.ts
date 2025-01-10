import {Length, IsOptional, IsString, IsPostalCode} from 'class-validator';

export class AddressDTO {

    @IsPostalCode('BR')
    cep: string;

    @IsString()
    @Length(5,200)
    logradouro: string;

    @IsOptional()
    @Length(5, 200)
    complemento?: string;

    @IsOptional()
    @IsString()
    @Length(5, 200)
    unidade?: string;

    @IsString()
    @Length(5,200)
    bairro: string;

    @IsString()
    @Length(5,200)
    localidade: string;

    @IsString()
    @Length(2, 2)
    uf: string;

    @IsString()
    @Length(5, 200)
    estado: string;

    @IsString()
    @IsOptional()
    @Length(5, 200)
    regiao?: string;

    @IsString()
    @IsOptional()
    @Length(7,7)
    ibge?: string;

    @IsOptional()
    @IsString()
    @Length(1, 4)
    gia?: string;

    @IsOptional()
    @IsString()
    @Length(2, 2)
    ddd?: string;

    @IsOptional()
    @IsString()
    @Length(3, 4)
    siafi?: string;

}