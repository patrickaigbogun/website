import type { auth } from '@/config/auth/providers';
import {
	customSessionClient,
	magicLinkClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:7990',
	plugins: [customSessionClient<typeof auth>(), magicLinkClient()],
});
