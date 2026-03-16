import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const rawUrl = process.env.DATABASE_URL_ACCESS ?? ''
        const connectionString = rawUrl.split('?')[0]

        const adapter = new PrismaPg(
            { connectionString },
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
