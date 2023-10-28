import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { AtraccionTuristicaModule } from './atraccion-turistica/atraccion-turistica.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: process.env.DATABASE,
    }),
    CommonModule,
    AtraccionTuristicaModule,
  ],
})
export class AppModule {}
