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
import { RolesService } from '../services/roles.service'
import { CreateRoleDto } from '../domain/dtos/create-role.dto'
import { UpdateRoleDto } from '../domain/dtos/update-role.dto'
import { PaginationDto } from '../pagination.dto'

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.rolesService.findAll(pagination)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rolesService.findOne(id)
    }

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
        return this.rolesService.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.rolesService.remove(id)
    }
}
