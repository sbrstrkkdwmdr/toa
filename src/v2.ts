import { credentials } from './helper';

export function login(clientId: string, clientSecret: string) {
    credentials.id = clientId;
    credentials.secret = clientSecret;
}

export * as beatmaps from './v2/beatmaps';
export * as scores from './v2/scores';
export * as users from './v2/users';

