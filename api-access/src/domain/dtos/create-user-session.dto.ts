import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUserSessionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    user_id: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    refresh_token: string

    @ApiProperty()
    @IsDateString()
    expires_at: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    device_type?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    device_name?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    device_id?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    ip_address?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    user_agent?: string
}
