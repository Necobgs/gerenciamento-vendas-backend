import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(private readonly jwtService:JwtService,
    private readonly usuarioService:UsuarioService
){}

  signUp(dto:AuthDto){
    this.usuarioService.create(dto)
    return this.signIn(dto);
  }

  async signIn(dto:AuthDto) {
    const foundedUser = await this.usuarioService.findByEmail(dto.email)
    if(!foundedUser || !bcrypt.compare(dto.senha,foundedUser.senha)) return new HttpException('Usuário não encontrado',HttpStatus.NOT_FOUND)
    const payload = {
      username: foundedUser.email, 
      sub:foundedUser.id
    }
    return {acessToken:this.jwtService.sign(payload)};
  }

  signOut() {
    return 'SignOut';
  }

}
