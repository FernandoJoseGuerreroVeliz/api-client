import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        photo_url: string | null;
        country_code: string | null;
        phone: string | null;
        password_hash: string;
        role_name: string;
        status_name: string;
        created_at: Date | null;
    }[]>;
}
