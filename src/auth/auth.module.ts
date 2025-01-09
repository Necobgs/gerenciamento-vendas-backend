import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports:[
    UsuarioModule,
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService:ConfigService)=>({
      secret:configService.get("JWT_SECRET"),
      signOptions:{ 
        expiresIn:configService.get("EXPIRES_IN")
      }
    })
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
