import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { AtraccionTuristicaModule } from './atraccion-turistica/atraccion-turistica.module';
import { SeedModule } from './seed/seed.module';
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { DayModule } from './day/day.module';
import { ContentTypeModule } from './content-type/content-type.module';
import { UserModule } from './user/user.module';

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
    SeedModule,
    ContentModule,
    AuthModule,
    RoleModule,
    DayModule,
    ContentTypeModule,
    UserModule,
  ],
})
export class AppModule {}
