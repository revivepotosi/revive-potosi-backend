import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoleModule } from 'src/role/role.module';
import { DayModule } from 'src/day/day.module';
import { ContentTypeModule } from 'src/content-type/content-type.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DayModule, ContentTypeModule, RoleModule],
})
export class SeedModule {}
