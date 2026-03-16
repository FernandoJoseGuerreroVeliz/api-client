import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateRoleDto } from '../domain/dtos/create-role.dto'
import { UpdateRoleDto } from '../domain/dtos/update-role.dto'
import { PaginationDto } from '../pagination.dto'
import { paginate } from '../utils/paginate'

@Injectable()
export class RolesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [data, totalCount] = await this.prisma.$transaction([
            this.prisma.roles.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
            this.prisma.roles.count(),
        ])

        return paginate(data, totalCount, page, limit)
    }

    async findOne(id: string) {
        const role = await this.prisma.roles.findUnique({ where: { id } })
        if (!role) throw new NotFoundException(`Role ${id} not found`)
        return role
    }

    async create(dto: CreateRoleDto) {
        return this.prisma.roles.create({ data: dto })
    }

    async update(id: string, dto: UpdateRoleDto) {
        await this.findOne(id)
        return this.prisma.roles.update({ where: { id }, data: dto })
    }

    async remove(id: string) {
        await this.findOne(id)
        return this.prisma.roles.delete({ where: { id } })
    }
}
