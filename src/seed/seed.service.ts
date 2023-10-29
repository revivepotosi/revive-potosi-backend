import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from 'src/common/entities/day.entity';
import { ContentType } from 'src/content/entities/contentType.entity';
import { CONTENT_TYPES, DAYS } from './data';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Day.name)
    private readonly dayModel: Model<Day>,
    @InjectModel(ContentType.name)
    private readonly contentTypeModel: Model<ContentType>,
  ) {}
  async executeSeed() {
    try {
      await this.dayModel.deleteMany({});
      await this.contentTypeModel.deleteMany({});
      await this.dayModel.insertMany(DAYS);
      await this.contentTypeModel.insertMany(CONTENT_TYPES);
      return 'Seed Executed';
    } catch (error) {
      if (error === 'E11000') {
        throw new BadRequestException('Seed Duplicado');
      }
      console.log(error);
      throw new InternalServerErrorException('No se puede ejecutar el Seed');
    }
  }
}
