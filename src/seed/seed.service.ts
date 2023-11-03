import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONTENT_TYPES, DAYS, ROLES } from './data';
import { Role } from 'src/role/entities/role.entity';
import { Day } from 'src/day/entities/day.entity';
import { ContentType } from 'src/content-type/entities/content-type.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Day.name)
    private readonly dayModel: Model<Day>,
    @InjectModel(ContentType.name)
    private readonly contentTypeModel: Model<ContentType>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}
  async executeSeed() {
    try {
      await this.dayModel.deleteMany({});
      await this.contentTypeModel.deleteMany({});
      await this.roleModel.deleteMany({});
      await this.dayModel.insertMany(DAYS);
      await this.contentTypeModel.insertMany(CONTENT_TYPES);
      await this.roleModel.insertMany(ROLES);
      return 'Seed Executed';
    } catch (error) {
      if (error === 'E11000') {
        throw new BadRequestException('Algun campo duplicado Duplicado');
      }
      console.log(error);
      throw new InternalServerErrorException('No se puede ejecutar el Seed');
    }
  }
}
