import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ required: false, default: true })
    @IsOptional()
    @IsBoolean()
    status?: boolean
}
