import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { Address } from 'src/adrress/entities/address.entity';

@Entity()
export class Store {

    @PrimaryGeneratedColumn('uuid')
    storeId: string;

    @Column('varchar', {length:255, name: 'store_name'} )
    storeName: string;

    @Column('varchar', {length:5, name: 'type'})
    type: string;

    @Column('varchar', {length:20, name: 'telephone_number'})
    telephoneNumber: string;

    @Column('varchar', {length:255, name: 'email'})
    email: string;

    @OneToOne(()=>Address)
    @JoinColumn({name:'address_id'})
    address: Address;

}