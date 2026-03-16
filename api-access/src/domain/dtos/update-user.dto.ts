import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length, MinLength } from 'class-validator'

export class UpdateUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({ required: false, minLength: 8 })
    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    role_name?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status_name?: string

    @ApiProperty({ required: false, minLength: 2, maxLength: 2, example: 'US' })
    @IsOptional()
    @IsString()
    @Length(2, 2)
    country_code?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    phone?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    photo_url?: string
}
