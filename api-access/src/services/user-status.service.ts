import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateUserStatusDto } from '../domain/dtos/create-user-status.dto'
import { UpdateUserStatusDto } from '../domain/dtos/update-user-status.dto'
import { PaginationDto } from '../pagination.dto'
import { paginate } from '../utils/paginate'

@Injectable()
export class UserStatusService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [data, totalCount] = await this.prisma.$transaction([
            this.prisma.user_status.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
            this.prisma.user_status.count(),
        ])

        return paginate(data, totalCount, page, limit)
    }

    async findOne(name: string) {
        const status = await this.prisma.user_status.findUnique({ where: { name } })
        if (!status) throw new NotFoundException(`UserStatus ${name} not found`)
        return status
    }

    async create(dto: CreateUserStatusDto) {
        return this.prisma.user_status.create({ data: dto })
    }

    async update(name: string, dto: UpdateUserStatusDto) {
        await this.findOne(name)
        return this.prisma.user_status.update({ where: { name }, data: dto })
    }

    async remove(name: string) {
        await this.findOne(name)
        return this.prisma.user_status.delete({ where: { name } })
    }
}
