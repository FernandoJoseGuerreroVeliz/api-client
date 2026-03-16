import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common'
import { PrismaModule } from './modules/prisma.module'
import { JwtMiddleware } from '@pata-dev/library-utils'
import { AppController } from './app.controller'
import { BasicAuthMiddleware } from './middlewares/basic-auth.middleware'

@Module({
    controllers: [AppController],
    imports: [
        PrismaModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtMiddleware)
            .exclude(
                { path: 'health', method: RequestMethod.GET },
            )
            .forRoutes({ path: '(.*)', method: RequestMethod.ALL })

        consumer.apply(BasicAuthMiddleware).forRoutes(
            {
                path: 'users/filter-employers-by-ids-score',
                method: RequestMethod.POST,
            },
            {
                path: 'users/by-ids',
                method: RequestMethod.POST,
            },
        )
    }
}