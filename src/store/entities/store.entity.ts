import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Store {

    @PrimaryGeneratedColumn('uuid')
    storeId: string;

    @Column('varchar', {length:255, name: 'store_name'})
    storeName: string;

    @Column('varchar', {length: 255, name: 'address_1'})
    address1: string;

    @Column('varchar', {length: 255, name: 'address_2'})
    address2?: string;

    @Column('varchar', {length: 255, name: 'address_3'})
    address3?: string;

    @Column('varchar', {length: 50, name: 'city'})
    city: string;

    @Column('varchar', {length: 50, name: 'district'})
    district: string;

    @Column('varchar', {length: 20, name: 'state'})
    state: string;

    @Column('varchar', {length:5, name: 'type'})
    type: string;

    @Column('varchar', {length: 30, name: 'coutry'})
    country?: string;

    @Column('varchar', {length: 12, name: 'Postal_code'})
    postalCode: string;

    @Column('varchar', {length: 20, name: 'telephone_number'})
    telephoneNumber: string;

    @Column('varchar', {length:255, name: 'email'})
    emailAddress: string;

}