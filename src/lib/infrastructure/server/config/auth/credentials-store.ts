import env from "~/lib/infrastructure/server/config/env";
import type { TCredentials } from "~/lib/core/entity/auth/userpass-credentials";

export const VALID_CREDENTIALS =
    {
        username: env.PRIMARY_USER_USERNAME! as string || 'admin',
        password: env.PRIMARY_USER_PASSWORD! as string || 'admin',
    } as TCredentials;