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
import { UsersModule } from './modules/users.module'
import { UserSessionsModule } from './modules/user-sessions.module'
import { RolesModule } from './modules/roles.module'
import { UserStatusModule } from './modules/user-status.module'
import { CountriesModule } from './modules/countries.module'

@Module({
    controllers: [AppController],
    imports: [
        PrismaModule,
        UsersModule,
        UserSessionsModule,
        RolesModule,
        UserStatusModule,
        CountriesModule,
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