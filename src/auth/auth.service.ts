import { BadRequestException, Injectable } from '@nestjs/common';
import { validePassword } from 'src/common/utils/bcrypt';
import { LoginDto } from './dto/login-dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { jwtConfig } from './constants/jwt-config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { password, email, username, rememberMe } = loginDto;
        const user: User = await this.findByEmailOrUsername(email, username);
        const isPasswordValid = await validePassword(password, user.password);
        if (isPasswordValid) {
            return {
                user,
                token: this.getJwtToken({ _id: user._id }, rememberMe),
            };
        }
        throw new BadRequestException('Usuario o contraseña incorrectos.');
    }

    private getJwtToken(payload: JwtPayload, rememberMe: boolean) {
        const token = this.jwtService.sign(
            payload,
            rememberMe ? jwtConfig.oneMonth : jwtConfig.tenHours,
        );
        return token;
    }

    private async findByEmailOrUsername(email: string, username: string) {
        let user: User;
        if (email) {
            user = await this.userModel
                .findOne({ email: email.toLowerCase() })
                .select('-__v');
        } else if (username) {
            user = await this.userModel
                .findOne({ username: username.toLowerCase().trim() })
                .select('-__v');
        }
        if (!user)
            throw new BadRequestException('Usuario o contraseña incorrectos.');
        return user;
    }
}
