import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const rawUrl = process.env.DATABASE_URL_ACCESS ?? ''
        const url = new URL(rawUrl)

        const adapter = new PrismaPg(
            {
                host: url.hostname,
                port: parseInt(url.port) || 5432,
                database: url.pathname.replace('/', ''),
                user: decodeURIComponent(url.username),
                password: decodeURIComponent(url.password),
            },
            { schema: 'access' },
        )

        super({ adapter, log: ['query', 'info', 'warn', 'error'] })
    }

    async onModuleInit() {
        await this.$connect()
        console.log('✅ Prisma connected')
    }

    async onModuleDestroy() {
        await this.$disconnect()
        console.log('👋 Prisma disconnected')
    }
}
