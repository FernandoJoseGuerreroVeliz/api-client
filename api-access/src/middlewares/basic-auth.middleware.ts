import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException(
                'Missing or invalid Basic Auth header',
            )
        }

        const base64Credentials = authHeader.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
            'utf-8',
        )
        const [username, password] = credentials.split(':')

        if (
            username !== process.env.BASIC_AUTH_USER ||
            password !== process.env.BASIC_AUTH_PASS
        ) {
            throw new UnauthorizedException('Invalid Basic Auth credentials')
        }

        next()
    }
}
