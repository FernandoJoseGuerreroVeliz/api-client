import { Module } from '@nestjs/common'
import { UserStatusController } from '../controllers/user-status.controller'
import { UserStatusService } from '../services/user-status.service'

@Module({
    controllers: [UserStatusController],
    providers: [UserStatusService],
    exports: [UserStatusService],
})
export class UserStatusModule {}
