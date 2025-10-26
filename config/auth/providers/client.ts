import type { auth } from '@/config/auth/providers';
import {
	customSessionClient,
	magicLinkClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	plugins: [customSessionClient<typeof auth>(), magicLinkClient()],
});
