import { JWT_SECRET, JWT_EXPIRES } from "@shared/utils/environment";

interface IAuthConfig {
    secret: string;
    expires_in: string;
}

export default {
    secret: JWT_SECRET,
    expires_in: JWT_EXPIRES
} as IAuthConfig;