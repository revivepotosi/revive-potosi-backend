import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import MESSAGES from 'src/common/utils/messages';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name)
        private readonly roleModel: Model<Role>,
    ) {}
    async create(createRoleDto: CreateRoleDto) {
        try {
            const role = await this.roleModel.create(createRoleDto);
            return role;
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    findAll() {
        return this.roleModel.find().select('-__v');
    }

    async findOne(id: string) {
        const role = await this.roleModel.findById(id).select('-__v');
        if (!role)
            throw new NotFoundException(`Rol con id "${id}" no encontrado`);
        return role;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto) {
        const role = await this.findOne(id);
        try {
            await role.updateOne(updateRoleDto);
            return { ...role.toJSON(), ...updateRoleDto };
        } catch (error) {
            this.handleExceptions(error);
        }
    }

    async remove(id: string) {
        const { deletedCount } = await this.roleModel.deleteOne({
            _id: id,
        });
        if (deletedCount === 0)
            throw new BadRequestException(`Rol con id "${id}" no encontrado`);
        return MESSAGES.getRemoveMessage(id, 'Rol eliminado con exito');
    }

    private handleExceptions(error: any) {
        if (error.code === 11000) {
            throw new BadRequestException(
                `Rol ya existe ${JSON.stringify(error.keyValue)}`,
            );
        }
        console.log(error);
        throw new InternalServerErrorException('No se puede crear el rol');
    }
}
