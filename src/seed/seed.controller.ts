import { Controller, Get, Param } from '@nestjs/common';
import { SeedService } from './seed.service';
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Get(':password')
    executeSeed(@Param('password') password: string) {
        return this.seedService.executeSeed(password);
    }
}
