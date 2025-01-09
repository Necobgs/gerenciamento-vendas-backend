import { IsEmail, IsMobilePhone, IsOptional, Length } from "class-validator";

export class CreateUsuarioDto {
    @IsEmail()
    email:string;
    
    @Length(2,100)
    nome:string;
    
    @Length(8,100)
    senha:string;
    
    @IsMobilePhone('pt-BR')
    @IsOptional()
    telefone?:string;

}
