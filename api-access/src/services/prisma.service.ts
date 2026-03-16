import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const adapter = new PrismaPg(
            {
                connectionString: process.env.DATABASE_URL_ACCESS,
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
