import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateCountryDto } from '../domain/dtos/create-country.dto'
import { UpdateCountryDto } from '../domain/dtos/update-country.dto'
import { PaginationDto } from '../pagination.dto'
import { paginate } from '../utils/paginate'

@Injectable()
export class CountriesService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(pagination: PaginationDto) {
        const { page, limit } = pagination
        const skip = (page - 1) * limit

        const [data, totalCount] = await this.prisma.$transaction([
            this.prisma.countries.findMany({ skip, take: limit, orderBy: { name: 'asc' } }),
            this.prisma.countries.count(),
        ])

        return paginate(data, totalCount, page, limit)
    }

    async findOne(code: string) {
        const country = await this.prisma.countries.findUnique({ where: { code } })
        if (!country) throw new NotFoundException(`Country ${code} not found`)
        return country
    }

    async create(dto: CreateCountryDto) {
        return this.prisma.countries.create({ data: dto })
    }

    async update(code: string, dto: UpdateCountryDto) {
        await this.findOne(code)
        return this.prisma.countries.update({ where: { code }, data: dto })
    }

    async remove(code: string) {
        await this.findOne(code)
        return this.prisma.countries.delete({ where: { code } })
    }
}
