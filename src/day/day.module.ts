import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from './entities/day.entity';

@Module({
    controllers: [DayController],
    providers: [DayService],
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
export class DayModule {}
