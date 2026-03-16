import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.service'

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET ?? 'changeme',
            signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as never },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
