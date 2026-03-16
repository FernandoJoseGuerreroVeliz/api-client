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
import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../domain/dtos/create-user.dto'
import { UpdateUserDto } from '../domain/dtos/update-user.dto'
import { UsersByIdsDto } from '../domain/dtos/users-by-ids.dto'
import { PaginationDto } from '../pagination.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.usersService.findAll(pagination)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id)
    }

    @Post('by-ids')
    findByIds(@Body() dto: UsersByIdsDto) {
        return this.usersService.findByIds(dto)
    }

    @Post('filter-employers-by-ids-score')
    filterEmployersByIdsScore(@Body() dto: UsersByIdsDto) {
        return this.usersService.findByIds(dto)
    }
}
