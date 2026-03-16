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
import { ROUTES } from './routes/routes'
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
                { path: ROUTES.HEALTH, method: RequestMethod.GET },
            )
            .forRoutes({ path: '(.*)', method: RequestMethod.ALL })

        consumer.apply(BasicAuthMiddleware).forRoutes(
            {
                path: ROUTES.USERS.FILTER_EMPLOYERS_BY_IDS_SCORE,
                method: RequestMethod.POST,
            },
            {
                path: ROUTES.USERS.BY_IDS,
                method: RequestMethod.POST,
            },
        )
    }
}