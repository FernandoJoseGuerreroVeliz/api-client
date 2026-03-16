import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
    @ApiProperty({ example: 'usuario@correo.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'miPassword123' })
    @IsString()
    @IsNotEmpty()
    password: string
}
