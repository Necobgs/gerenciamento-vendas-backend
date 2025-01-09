import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type:"postgres",
        host:configService.get('DATABASE_HOST'),
        port:+configService.get('DATABASE_PORT'),
        username:configService.get('DATABASE_USERNAME'),
        password:configService.get('DATABASE_PASSWORD') as string,
        database:configService.get('DATABASE_NAME'),
        entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
        synchronize:true
      })
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
