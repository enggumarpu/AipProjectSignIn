import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    UserId: number

    @Column()
    FirstName: string

    @Column()
    LastName: string

    @Column()
    Email: string

    @Column()
    @Exclude()
    Password: string


}