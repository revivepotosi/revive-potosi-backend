import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from 'src/common/entities/day.entity';
import { DAYS } from './data';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Day.name)
    private readonly dayModel: Model<Day>,
  ) {}
  async executeSeed() {
    await this.dayModel.deleteMany({});
    await this.dayModel.insertMany(DAYS);
    return 'Seed Executed';
  }
}
