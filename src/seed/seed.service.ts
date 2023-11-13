import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CONTENT_TYPES, DAYS, FIRST_USER, ROLES } from './data';
import { Role } from 'src/role/entities/role.entity';
import { Day } from 'src/day/entities/day.entity';
import { ContentType } from 'src/content-type/entities/content-type.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class SeedService {
    private seedSecret: string;
    constructor(
        @InjectModel(Day.name)
        private readonly dayModel: Model<Day>,
        @InjectModel(ContentType.name)
        private readonly contentTypeModel: Model<ContentType>,
        @InjectModel(Role.name)
        private readonly roleModel: Model<Role>,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        this.seedSecret = this.configService.get<string>('seedSecret');
    }
    async executeSeed(password: string) {
        if (password !== this.seedSecret)
            throw new UnauthorizedException('Sin autorización.');
        try {
            await this.dayModel.deleteMany({});
            await this.contentTypeModel.deleteMany({});
            await this.roleModel.deleteMany({});
            await this.dayModel.insertMany(DAYS);
            await this.contentTypeModel.insertMany(CONTENT_TYPES);
            await this.roleModel.insertMany(ROLES);
            const role: Role = await this.roleModel.findOne({
                name: ROLES[0].name,
            });
            if (!role)
                throw new InternalServerErrorException('No se encontro el Rol');
            const createUserDto: CreateUserDto = {
                ...FIRST_USER,
                roles: [role._id],
            };
            await this.userService.create(createUserDto);
            return 'Seed Executed';
        } catch (error) {
            if (error === 'E11000') {
                throw new BadRequestException(
                    'Algun campo duplicado Duplicado',
                );
            }
            throw new InternalServerErrorException(
                'No se puede ejecutar el Seed',
            );
        }
    }
}
