import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario])
  ],
  controllers: [],
  providers: [UsuarioService],
  exports:[UsuarioService]
})
export class UsuarioModule {}
