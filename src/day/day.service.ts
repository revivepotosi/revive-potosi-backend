import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Day } from './entities/day.entity';
import { Model } from 'mongoose';
import MESSAGES from 'src/common/utils/messages';

@Injectable()
export class DayService {
  constructor(
    @InjectModel(Day.name)
    private readonly dayModel: Model<Day>,
  ) {}
  async create(createDayDto: CreateDayDto) {
    try {
      const day = await this.dayModel.create(createDayDto);
      return day;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return this.dayModel.find().select('-__v');
  }

  async findOne(id: string) {
    const day = await this.dayModel.findById(id).select('-__v');
    if (!day) throw new NotFoundException(`Dia con id "${id}" no encontrado`);
    return day;
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    const day = await this.findOne(id);
    try {
      await day.updateOne(updateDayDto);
      return { ...day.toJSON(), ...updateDayDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.dayModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0)
      throw new BadRequestException(`Dia con id "${id}" no encontrado`);
    return MESSAGES.getRemoveMessage(id, 'Dia eliminado con exito');
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Dia ya existe ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException('No se puede crear el dia');
  }
}
