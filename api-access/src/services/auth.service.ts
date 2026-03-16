import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { PrismaService } from './prisma.service'
import { LoginDto } from '../domain/dtos/login.dto'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDto, meta: { ip?: string; userAgent?: string; deviceType?: string } = {}) {
        const user = await this.prisma.users.findUnique({
            where: { email: dto.email },
            include: { roles: true, user_status: true, countries: true },
        })

        if (!user) throw new UnauthorizedException('Credenciales inválidas')

        const passwordMatch = await bcrypt.compare(dto.password, user.password_hash)
        if (!passwordMatch) throw new UnauthorizedException('Credenciales inválidas')

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role_name,
        }

        const access_token = this.jwtService.sign(payload)
        const refresh_token = crypto.randomUUID()

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7)

        await this.prisma.user_sessions.create({
            data: {
                user_id: user.id,
                refresh_token,
                expires_at: expiresAt,
                ip_address: meta.ip,
                user_agent: meta.userAgent,
                device_type: meta.deviceType,
            },
        })

        const { password_hash: _, ...userWithoutPassword } = user

        return {
            access_token,
            refresh_token,
            user: userWithoutPassword,
        }
    }

    async logout(refreshToken: string) {
        const session = await this.prisma.user_sessions.findFirst({
            where: { refresh_token: refreshToken, revoked: false },
        })

        if (!session) throw new UnauthorizedException('Sesión no encontrada o ya cerrada')

        await this.prisma.user_sessions.update({
            where: { id: session.id },
            data: { revoked: true },
        })

        return { message: 'Sesión cerrada correctamente' }
    }

    async refreshToken(token: string) {
        const session = await this.prisma.user_sessions.findFirst({
            where: {
                refresh_token: token,
                revoked: false,
                expires_at: { gt: new Date() },
            },
            include: { users: true },
        })

        if (!session) throw new UnauthorizedException('Refresh token inválido o expirado')

        const payload = {
            sub: session.users.id,
            email: session.users.email,
            role: session.users.role_name,
        }

        const access_token = this.jwtService.sign(payload)

        await this.prisma.user_sessions.update({
            where: { id: session.id },
            data: { last_used_at: new Date() },
        })

        return { access_token }
    }
}
