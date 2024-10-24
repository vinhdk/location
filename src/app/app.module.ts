import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { Location } from './entities';
import { LocationModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`,
      load: [
        () => ({
          POSTGRES: {
            HOST: process.env['POSTGRES_HOST'],
            PORT: process.env['POSTGRES_PORT'],
            USER: process.env['POSTGRES_USER'],
            PASSWORD: process.env['POSTGRES_PASSWORD'],
            DB: process.env['POSTGRES_DB'],
          },
        }),
      ],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES.HOST'),
        port: configService.get('POSTGRES.PORT'),
        username: configService.get('POSTGRES.USER'),
        password: configService.get('POSTGRES.PASSWORD'),
        database: configService.get('POSTGRES.DB'),
        entities: [Location],
        synchronize: true,
      }),
    }),
    LocationModule,
  ],
})
export class AppModule {}
