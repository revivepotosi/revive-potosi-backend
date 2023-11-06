import { Module } from '@nestjs/common';
import { AtraccionTuristicaService } from './atraccion-turistica.service';
import { AtraccionTuristicaController } from './atraccion-turistica.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    AtraccionTuristica,
    AtraccionTuristicaSchema,
} from './entities/atraccion-turistica.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [AtraccionTuristicaController],
    providers: [AtraccionTuristicaService],
    imports: [
        ConfigModule,
        MongooseModule.forFeature([
            {
                name: AtraccionTuristica.name,
                schema: AtraccionTuristicaSchema,
            },
        ]),
    ],
})
export class AtraccionTuristicaModule {}
