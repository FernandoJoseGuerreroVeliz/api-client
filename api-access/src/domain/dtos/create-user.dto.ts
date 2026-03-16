import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator'

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role_name: string

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
