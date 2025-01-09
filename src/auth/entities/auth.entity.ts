import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsMobilePhone } from "class-validator";

@Entity({name:'usuarios'})
export class Auth {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsEmail()
    email:string;

    @Column()
    nome:string;

    @Column()
    senha:number;

    @Column()
    @IsMobilePhone('pt-BR')
    telefone:string;
}
