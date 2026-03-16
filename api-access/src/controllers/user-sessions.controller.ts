import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UserSessionsService } from '../services/user-sessions.service'
import { CreateUserSessionDto } from '../domain/dtos/create-user-session.dto'
import { PaginationDto } from '../pagination.dto'

@ApiTags('user-sessions')
@Controller('user-sessions')
export class UserSessionsController {
    constructor(private readonly userSessionsService: UserSessionsService) {}

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.userSessionsService.findAll(pagination)
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string, @Query() pagination: PaginationDto) {
        return this.userSessionsService.findByUser(userId, pagination)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userSessionsService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateUserSessionDto) {
        return this.userSessionsService.create(dto)
    }

    @Patch(':id/revoke')
    revoke(@Param('id') id: string) {
        return this.userSessionsService.revoke(id)
    }

    @Patch('user/:userId/revoke-all')
    revokeAllByUser(@Param('userId') userId: string) {
        return this.userSessionsService.revokeAllByUser(userId)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userSessionsService.remove(id)
    }
}
