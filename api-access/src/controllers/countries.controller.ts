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
import { CountriesService } from '../services/countries.service'
import { CreateCountryDto } from '../domain/dtos/create-country.dto'
import { UpdateCountryDto } from '../domain/dtos/update-country.dto'
import { PaginationDto } from '../pagination.dto'

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.countriesService.findAll(pagination)
    }

    @Get(':code')
    findOne(@Param('code') code: string) {
        return this.countriesService.findOne(code)
    }

    @Post()
    create(@Body() dto: CreateCountryDto) {
        return this.countriesService.create(dto)
    }

    @Patch(':code')
    update(@Param('code') code: string, @Body() dto: UpdateCountryDto) {
        return this.countriesService.update(code, dto)
    }

    @Delete(':code')
    remove(@Param('code') code: string) {
        return this.countriesService.remove(code)
    }
}
