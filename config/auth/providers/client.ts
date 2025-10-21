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

// Simple sign-in helper compatible with app UI hooks
// Redirects to Better Auth OAuth/Magic endpoints handled by the server
export function signIn(provider: string = 'github') {
	const base = 'http://localhost:7990'.replace(/\/$/, '');
	// Known OAuth providers typically map to /auth/sign-in/:provider
	// For magic link flows, trigger your own UI to collect email first
	if (typeof window !== 'undefined') {
		window.location.assign(`${base}/auth/sign-in/${provider}`);
	}
}

export function signOut() {
	const base = 'http://localhost:7990'.replace(/\/$/, '');
	if (typeof window !== 'undefined') {
		window.location.assign(`${base}/auth/sign-out`);
	}
}
