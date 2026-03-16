import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from './prisma.service'
import { CreateUserDto } from '../domain/dtos/create-user.dto'
import { UpdateUserDto } from '../domain/dtos/update-user.dto'
import { UsersByIdsDto } from '../domain/dtos/users-by-ids.dto'
import { PaginationDto } from '../pagination.dto'
import { paginate } from '../utils/paginate'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    private exclude<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): Omit<T, keyof T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([k]) => !keys.includes(k as keyof T)),
        ) as Omit<T, keyof T>
    }

    async findAll(pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [users, totalCount] = await this.prisma.$transaction([
            this.prisma.users.findMany({
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: { roles: true, user_status: true, countries: true },
            }),
            this.prisma.users.count(),
        ])

        const data = users.map((u) => this.exclude(u as Record<string, unknown>, ['password_hash'] as never[]))
        return paginate(data, totalCount, page, limit)
    }

    async findOne(id: string) {
        const user = await this.prisma.users.findUnique({
            where: { id },
            include: { roles: true, user_status: true, countries: true },
        })
        if (!user) throw new NotFoundException(`User ${id} not found`)
        return this.exclude(user as Record<string, unknown>, ['password_hash'] as never[])
    }

    async create(dto: CreateUserDto) {
        const existing = await this.prisma.users.findUnique({ where: { email: dto.email } })
        if (existing) throw new ConflictException('Email already in use')

        const { password, ...rest } = dto
        const password_hash = await bcrypt.hash(password, 10)

        const user = await this.prisma.users.create({
            data: { ...rest, password_hash },
            include: { roles: true, user_status: true, countries: true },
        })

        return this.exclude(user as Record<string, unknown>, ['password_hash'] as never[])
    }

    async update(id: string, dto: UpdateUserDto) {
        await this.findOne(id)

        const { password, ...rest } = dto
        const data: Record<string, unknown> = { ...rest }

        if (password) {
            data.password_hash = await bcrypt.hash(password, 10)
        }

        const user = await this.prisma.users.update({
            where: { id },
            data,
            include: { roles: true, user_status: true, countries: true },
        })

        return this.exclude(user as Record<string, unknown>, ['password_hash'] as never[])
    }

    async remove(id: string) {
        await this.findOne(id)
        return this.prisma.users.delete({ where: { id } })
    }

    async findByIds(dto: UsersByIdsDto) {
        const users = await this.prisma.users.findMany({
            where: { id: { in: dto.ids } },
            include: { roles: true, user_status: true, countries: true },
        })
        return users.map((u) => this.exclude(u as Record<string, unknown>, ['password_hash'] as never[]))
    }
}
