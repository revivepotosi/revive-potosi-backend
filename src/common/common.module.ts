import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from './entities/day.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Day.name,
        schema: DaySchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class CommonModule {}
