import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
    datasource: {
        url: env('DATABASE_URL_ACCESS'),
    },
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
})
