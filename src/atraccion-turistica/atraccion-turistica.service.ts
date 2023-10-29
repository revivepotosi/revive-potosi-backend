import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAtraccionTuristicaDto } from './dto/create-atraccion-turistica.dto';
import { UpdateAtraccionTuristicaDto } from './dto/update-atraccion-turistica.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AtraccionTuristica } from './entities/atraccion-turistica.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import MESSAGES from 'src/common/utils/messages';

@Injectable()
export class AtraccionTuristicaService {
  private defaultLimit: number;
  constructor(
    @InjectModel(AtraccionTuristica.name)
    private readonly atraccionTuristicaModel: Model<AtraccionTuristica>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }
  async create(createAtraccionTuristicaDto: CreateAtraccionTuristicaDto) {
    try {
      const atraccionTuristica = await this.atraccionTuristicaModel.create(
        createAtraccionTuristicaDto,
      );
      return atraccionTuristica;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.atraccionTuristicaModel
      .find()
      .limit(limit)
      .skip(offset)
      .populate('schedule.day')
      .select('-__v');
  }

  async findOne(id: string) {
    const atraccionTuristica = await this.atraccionTuristicaModel
      .findById(id)
      .populate('schedule.day')
      .select('-__v');
    if (!atraccionTuristica)
      throw new NotFoundException(
        `Atractivo turistico con id "${id}" no encontrado`,
      );
    return atraccionTuristica;
  }

  async update(
    id: string,
    updateAtraccionTuristicaDto: UpdateAtraccionTuristicaDto,
  ) {
    const atraccionTuristica = await this.findOne(id);
    try {
      await atraccionTuristica.updateOne(updateAtraccionTuristicaDto);
      return { ...atraccionTuristica.toJSON(), ...updateAtraccionTuristicaDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.atraccionTuristicaModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0)
      throw new BadRequestException(
        `Atractivo turistico con id "${id}" no encontrado`,
      );
    return MESSAGES.getRemoveMessage(
      id,
      'Atractivo turistico eliminado con exito',
    );
  }

  private handleExceptions(error: any) {
    console.log(error);
    throw new InternalServerErrorException(
      'No se puede crear el atractivo turistico',
    );
  }
}
