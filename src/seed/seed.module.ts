import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CommonModule } from 'src/common/common.module';
import { ContentModule } from 'src/content/content.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CommonModule, ContentModule],
})
export class SeedModule {}
