import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
