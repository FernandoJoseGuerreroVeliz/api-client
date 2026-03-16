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
import { UserStatusService } from '../services/user-status.service'
import { CreateUserStatusDto } from '../domain/dtos/create-user-status.dto'
import { UpdateUserStatusDto } from '../domain/dtos/update-user-status.dto'
import { PaginationDto } from '../pagination.dto'

@ApiTags('user-status')
@Controller('user-status')
export class UserStatusController {
    constructor(private readonly userStatusService: UserStatusService) {}

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.userStatusService.findAll(pagination)
    }

    @Get(':name')
    findOne(@Param('name') name: string) {
        return this.userStatusService.findOne(name)
    }

    @Post()
    create(@Body() dto: CreateUserStatusDto) {
        return this.userStatusService.create(dto)
    }

    @Patch(':name')
    update(@Param('name') name: string, @Body() dto: UpdateUserStatusDto) {
        return this.userStatusService.update(name, dto)
    }

    @Delete(':name')
    remove(@Param('name') name: string) {
        return this.userStatusService.remove(name)
    }
}
