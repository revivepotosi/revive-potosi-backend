import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class AuthService {
  signUp(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
