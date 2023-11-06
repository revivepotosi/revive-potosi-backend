import { Module } from '@nestjs/common';
import { AtraccionTuristicaTypeService } from './atraccion-turistica-type.service';
import { AtraccionTuristicaTypeController } from './atraccion-turistica-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    AtraccionTuristicaType,
    AtraccionTuristicaTypeSchema,
} from './entities/atraccion-turistica-type.entity';

@Module({
    controllers: [AtraccionTuristicaTypeController],
    providers: [AtraccionTuristicaTypeService],
    imports: [
        MongooseModule.forFeature([
            {
                name: AtraccionTuristicaType.name,
                schema: AtraccionTuristicaTypeSchema,
            },
        ]),
    ],
    exports: [MongooseModule],
})
export class AtraccionTuristicaTypeModule {}
