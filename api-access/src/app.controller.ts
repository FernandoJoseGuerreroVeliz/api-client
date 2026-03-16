import { Controller, Get } from '@nestjs/common'
import { Public } from './domain/decorators/public.decorator'

@Controller()
export class AppController {
    @Public()
    @Get('health')
    getHealth() {
        return {
            status: 'ok',
            service: 'api-access',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        }
    }
}
