import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';


@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres', // ou o tipo do seu banco
    //   host: 'localhost', 
    //   port: 5432,
    //   username: 'postgres', 
    //   password: 'papagaio',
    //   database: 'gerenciamento-vendas',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // Garante que ele encontre tanto .ts quanto .js
    //   synchronize: true,
    // })
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
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
