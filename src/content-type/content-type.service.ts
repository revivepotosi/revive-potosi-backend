import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateContentTypeDto } from './dto/create-content-type.dto';
import { UpdateContentTypeDto } from './dto/update-content-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ContentType } from './entities/content-type.entity';
import { Model } from 'mongoose';
import MESSAGES from 'src/common/utils/messages';

@Injectable()
export class ContentTypeService {
    constructor(
        @InjectModel(ContentType.name)
        private readonly contentTypeModel: Model<ContentType>,
    ) {}
    async create(createContentTypeDto: CreateContentTypeDto) {
        try {
            const contentType =
                await this.contentTypeModel.create(createContentTypeDto);
            return contentType;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    findAll() {
        return this.contentTypeModel.find().select('-__v');
    }

    async findOne(id: string) {
        const contentType = await this.contentTypeModel
            .findById(id)
            .select('-__v');
        if (!contentType)
            throw new NotFoundException(
                `Tipo de contenido con id "${id}" no encontrado`,
            );
        return contentType;
    }

    async update(id: string, updateContentTypeDto: UpdateContentTypeDto) {
        const contentType = await this.findOne(id);
        try {
            await contentType.updateOne(updateContentTypeDto);
            return { ...contentType.toJSON(), ...updateContentTypeDto };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async remove(id: string) {
        const { deletedCount } = await this.contentTypeModel.deleteOne({
            _id: id,
        });
        if (deletedCount === 0)
            throw new BadRequestException(
                `Tipo de contenido con id "${id}" no encontrado`,
            );
        return MESSAGES.getRemoveMessage(
            id,
            'Tipo de contenido eliminado con exito',
        );
    }

    private handleExceptions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(
                `Tipo de contenido ya existe ${JSON.stringify(error.keyValue)}`,
            );
        }
        console.log(error);
        throw new InternalServerErrorException(
            'No se puede crear el tipo de contenido',
        );
    }
}
