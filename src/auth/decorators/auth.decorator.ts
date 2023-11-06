import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { META_ROLES, ValidRoles } from '../constants/roles';

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        SetMetadata(META_ROLES, roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}
