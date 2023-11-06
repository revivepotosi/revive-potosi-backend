import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Content } from './entities/content.entity';
import { Model } from 'mongoose';
import MESSAGES from 'src/common/utils/messages';
import { FindAllParamsDto } from './dto/find-all-params.dto';

@Injectable()
export class ContentService {
    constructor(
        @InjectModel(Content.name)
        private readonly contentModel: Model<Content>,
    ) {}
    async create(createContentDto: CreateContentDto) {
        try {
            const content = await this.contentModel.create(createContentDto);
            return content;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    findAll(findAllParamsDto: FindAllParamsDto) {
        const { atraccionTuristicaID } = findAllParamsDto;
        if (atraccionTuristicaID)
            return this.contentModel
                .find({ atraccionTuristica: atraccionTuristicaID })
                .populate('type')
                .select('-__v');
        return this.contentModel.find().populate('type').select('-__v');
    }

    async findOne(id: string) {
        const content = await this.contentModel
            .findById(id)
            .populate('type')
            .select('-__v');
        if (!content)
            throw new NotFoundException(
                `Contenido con id "${id}" no encontrado`,
            );
        return content;
    }

    async update(id: string, updateContentDto: UpdateContentDto) {
        const content = await this.findOne(id);
        try {
            await this.contentModel.updateOne(updateContentDto);
            return { ...content.toJSON(), ...updateContentDto };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async remove(id: string) {
        const { deletedCount } = await this.contentModel.deleteOne({
            _id: id,
        });
        if (deletedCount === 0)
            throw new BadRequestException(
                `Contenido con id "${id}" no encontrado`,
            );
        return MESSAGES.getRemoveMessage(id, 'Contenido eliminado con exito');
    }

    private handleExceptions(error: any) {
        console.log(error);
        throw new InternalServerErrorException(
            'No se puede crear el contenido',
        );
    }
}
