import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Address {

    @PrimaryGeneratedColumn('uuid')
    addressId: string;

    @Column('varchar', {length: 10, name: 'postal_code'})
    postalCode: string;

    @Column('varchar', {length: 50, name: 'city'})
    city: string;

    @Column('varchar', {length: 50, name: 'district'})
    district: string;

    @Column('varchar', {length: 50, name: 'state'})
    state: string;

    @Column('varchar', {length: 50, name: 'coutry'})
    coutry?: string;

    @Column('varchar', {length: 255, name: 'address_one'})
    addressOne: string;

    @Column('varchar', {length: 255, name: 'address_two'})
    addressTwo?: string;

    @Column('varchar', {length: 255, name: 'address_three'})
    addressThree?: string;

    @Column('varchar', {length: 100, name: 'latitude'})
    latitude: number;

    @Column('varchar', {length: 100, name: 'longitude'})
    longitude: number;
}