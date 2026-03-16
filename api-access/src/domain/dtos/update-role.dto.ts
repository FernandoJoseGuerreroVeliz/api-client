import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateRoleDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    status?: boolean
}
