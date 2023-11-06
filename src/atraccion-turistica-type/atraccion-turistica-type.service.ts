import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateAtraccionTuristicaTypeDto } from './dto/create-atraccion-turistica-type.dto';
import { UpdateAtraccionTuristicaTypeDto } from './dto/update-atraccion-turistica-type.dto';
import MESSAGES from 'src/common/utils/messages';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtraccionTuristicaType } from './entities/atraccion-turistica-type.entity';

@Injectable()
export class AtraccionTuristicaTypeService {
    constructor(
        @InjectModel(AtraccionTuristicaType.name)
        private readonly atraccionTuristicaTypeModel: Model<AtraccionTuristicaType>,
    ) {}

    async create(
        createAtraccionTuristicaTypeDto: CreateAtraccionTuristicaTypeDto,
    ) {
        try {
            const atraccionTuristica =
                await this.atraccionTuristicaTypeModel.create(
                    createAtraccionTuristicaTypeDto,
                );
            return atraccionTuristica;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    findAll() {
        return this.atraccionTuristicaTypeModel.find().select('-__v');
    }

    async findOne(id: string) {
        const atraccionTuristica = await this.atraccionTuristicaTypeModel
            .findById(id)
            .select('-__v');
        if (!atraccionTuristica)
            throw new NotFoundException(
                `Tipo de atraccion turistica con id "${id}" no encontrado`,
            );
        return atraccionTuristica;
    }

    async update(
        id: string,
        updateAtraccionTuristicaTypeDto: UpdateAtraccionTuristicaTypeDto,
    ) {
        const atraccionTuristica = await this.findOne(id);
        try {
            await atraccionTuristica.updateOne(updateAtraccionTuristicaTypeDto);
            return {
                ...atraccionTuristica.toJSON(),
                ...updateAtraccionTuristicaTypeDto,
            };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async remove(id: string) {
        const { deletedCount } =
            await this.atraccionTuristicaTypeModel.deleteOne({
                _id: id,
            });
        if (deletedCount === 0)
            throw new BadRequestException(
                `Tipo de atraccion turistica con id "${id}" no encontrado`,
            );
        return MESSAGES.getRemoveMessage(
            id,
            'Tipo de atraccion turistica eliminado con exito',
        );
    }

    private handleExceptions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(
                `Tipo de atraccion turistica ya existe ${JSON.stringify(
                    error.keyValue,
                )}`,
            );
        }
        console.log(error);
        throw new InternalServerErrorException(
            'No se puede crear el tipo de atraccion turistica',
        );
    }
}
