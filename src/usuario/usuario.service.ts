import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario) private readonly userRepository:Repository<Usuario>){}

  async create(dto: AuthDto) {
    const foundedUser = await this.findByEmail(dto.email)
    if(foundedUser) return new HttpException('Email já está em uso!',HttpStatus.CONFLICT)
    const data = { 
      ...dto,
      senha: await bcrypt.hash(dto.senha,10)
      }
      const userCreate = this.userRepository.create(data);
    return this.userRepository.save(userCreate);
  }

  findByEmail(email:string) {
    return this.userRepository.findOneBy({email})
  }
}
