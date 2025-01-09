import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    nome:string;

    @Column()
    senha:string;

    @Column({nullable:true})
    telefone?:string;
}
