import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { META_ROLES } from '../constants/roles';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.get<string[]>(
      META_ROLES,
      context.getClass(),
    );
    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');
    for (const role of user.roles) {
      if (validRoles.includes(role.name)) {
        return true;
      }
    }

    throw new ForbiddenException(`User ${user.username} don't have role`);
  }
}
