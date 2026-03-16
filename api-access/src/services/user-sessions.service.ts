import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateUserSessionDto } from '../domain/dtos/create-user-session.dto'
import { PaginationDto } from '../pagination.dto'
import { paginate } from '../utils/paginate'

@Injectable()
export class UserSessionsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [data, totalCount] = await this.prisma.$transaction([
            this.prisma.user_sessions.findMany({ skip, take: limit, orderBy: { created_at: 'desc' } }),
            this.prisma.user_sessions.count(),
        ])

        return paginate(data, totalCount, page, limit)
    }

    async findByUser(userId: string, pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [data, totalCount] = await this.prisma.$transaction([
            this.prisma.user_sessions.findMany({
                where: { user_id: userId },
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            this.prisma.user_sessions.count({ where: { user_id: userId } }),
        ])

        return paginate(data, totalCount, page, limit)
    }

    async findOne(id: string) {
        const session = await this.prisma.user_sessions.findUnique({ where: { id } })
        if (!session) throw new NotFoundException(`Session ${id} not found`)
        return session
    }

    async create(dto: CreateUserSessionDto) {
        return this.prisma.user_sessions.create({
            data: {
                ...dto,
                expires_at: new Date(dto.expires_at),
            },
        })
    }

    async revoke(id: string) {
        await this.findOne(id)
        return this.prisma.user_sessions.update({
            where: { id },
            data: { revoked: true },
        })
    }

    async revokeAllByUser(userId: string) {
        return this.prisma.user_sessions.updateMany({
            where: { user_id: userId, revoked: false },
            data: { revoked: true },
        })
    }

    async remove(id: string) {
        await this.findOne(id)
        return this.prisma.user_sessions.delete({ where: { id } })
    }
}
