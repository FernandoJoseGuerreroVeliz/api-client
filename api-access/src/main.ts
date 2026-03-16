import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
// GlobalExceptionFilter comentado hasta resolver el export de @pata-dev/library-utils
// import { GlobalExceptionFilter } from '@pata-dev/library-utils'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    })

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    )

    app.setGlobalPrefix('api/access')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )

    // app.useGlobalFilters(new GlobalExceptionFilter())

    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    })

    const config = new DocumentBuilder()
        .setTitle('API Access - PATA')
        .setDescription('API de autenticación y gestión de acceso')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'Authorization',
                description: 'Enter JWT token in the format: Bearer <token>',
                in: 'header',
            },
            'access-token',
        )
        .addBasicAuth(
            {
                type: 'http',
                scheme: 'basic',
                description:
                    'Autenticación básica para comunicación entre microservicios internos',
            },
            'BasicAuth',
        )
        .addTag('Users', 'Endpoints de gestión de usuarios')
        .addTag('Authentication', 'Endpoints para autentificar usuarios')
        .addTag('User Categories', 'Endpoints de categorias de usuario')
        .addTag('User Documents', 'Endpoints de documentos  de usuario')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/access/docs', app, document)

    const port = process.env.PORT ?? 3016
    await app.listen(port)

    console.log(`🚀 API-ACCESS running on http://localhost:${port}`)
    console.log(
        `📚 Swagger docs available at http://localhost:${port}/api/access/docs`,
    )
}

bootstrap().catch((err) => {
    console.error('Error arrancando API-ACCESS:', err)
    process.exit(1)
})
