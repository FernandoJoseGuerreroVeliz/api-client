export const ROUTES = {
    HEALTH: 'health',

    AUTH: {
        BASE: 'auth',
        LOGIN: 'auth/login',
        LOGOUT: 'auth/logout',
        REFRESH: 'auth/refresh',
    },

    USERS: {
        BASE: 'users',
        BY_ID: 'users/:id',
        BY_IDS: 'users/by-ids',
        FILTER_EMPLOYERS_BY_IDS_SCORE: 'users/filter-employers-by-ids-score',
    },

    USER_SESSIONS: {
        BASE: 'user-sessions',
        BY_ID: 'user-sessions/:id',
        BY_USER: 'user-sessions/user/:userId',
        REVOKE: 'user-sessions/:id/revoke',
        REVOKE_ALL_BY_USER: 'user-sessions/user/:userId/revoke-all',
    },

    ROLES: {
        BASE: 'roles',
        BY_ID: 'roles/:id',
    },

    USER_STATUS: {
        BASE: 'user-status',
        BY_NAME: 'user-status/:name',
    },

    COUNTRIES: {
        BASE: 'countries',
        BY_CODE: 'countries/:code',
    },
} as const
