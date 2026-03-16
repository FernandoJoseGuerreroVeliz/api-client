import { Body, Controller, Headers, Ip, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from '../services/auth.service'
import { LoginDto } from '../domain/dtos/login.dto'
import { Public } from '../domain/decorators/public.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    login(
        @Body() dto: LoginDto,
        @Ip() ip: string,
        @Headers('user-agent') userAgent: string,
    ) {
        return this.authService.login(dto, { ip, userAgent })
    }

    @Post('logout')
    logout(@Body('refresh_token') refreshToken: string) {
        return this.authService.logout(refreshToken)
    }

    @Public()
    @Post('refresh')
    refresh(@Body('refresh_token') refreshToken: string) {
        return this.authService.refreshToken(refreshToken)
    }
}
