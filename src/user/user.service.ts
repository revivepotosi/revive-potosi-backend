import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generatePassword } from 'src/common/utils/bcrypt';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import MESSAGES from 'src/common/utils/messages';

@Injectable()
export class UserService {
  private defaultLimit: number;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const passwordEncrypted: string = await generatePassword(
        createUserDto.password,
      );
      const username = createUserDto.username.toLowerCase().trim();
      const email = createUserDto.email.toLowerCase();
      const user = await this.userModel.create({
        ...createUserDto,
        username,
        email,
        password: passwordEncrypted,
      });
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;
    return this.userModel
      .find()
      .limit(limit)
      .skip(offset)
      .populate('roles')
      .select('-__v -password');
  }

  async findOne(id: string) {
    const user = await this.userModel
      .findById(id)
      .populate('roles')
      .select('-__v -password');
    if (!user)
      throw new NotFoundException(`Usuario con id "${id}" no encontrado`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      await user.updateOne(updateUserDto);
      return { ...user.toJSON(), ...updateUserDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.userModel.deleteOne({
      _id: id,
    });
    if (deletedCount === 0)
      throw new BadRequestException(`Usuario con id "${id}" no encontrado`);
    return MESSAGES.getRemoveMessage(id, 'Usuario eliminado con exito');
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Usuario ya existe ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException('No se puede crear el usuario');
  }
}
