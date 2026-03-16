import { Module } from '@nestjs/common'
import { UserSessionsController } from '../controllers/user-sessions.controller'
import { UserSessionsService } from '../services/user-sessions.service'

@Module({
    controllers: [UserSessionsController],
    providers: [UserSessionsService],
    exports: [UserSessionsService],
})
export class UserSessionsModule {}
