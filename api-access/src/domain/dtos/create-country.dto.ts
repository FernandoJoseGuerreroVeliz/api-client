import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateCountryDto {
    @ApiProperty({ description: 'ISO 3166-1 alpha-2 country code', example: 'US' })
    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    code: string

    @ApiProperty({ example: 'United States' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '+1' })
    @IsString()
    @IsNotEmpty()
    phone_prefix: string
}
