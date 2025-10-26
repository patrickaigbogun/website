'use client';
import { authClient } from '@/config/auth/providers/client';
import { useIsClient } from '@uidotdev/usehooks';
import { Comments } from '@fuma-comment/react';

export function CommentsWithAuth({ page }: { page: string }) {
	const isClient = useIsClient();
	return (
		<Comments
			apiUrl='/api/v1/comments'
			// comments are grouped by page
			page={page}
			auth={{
				type: 'api',
				// function to sign in using Better Auth client
				signIn: async () => {
					if (!isClient) return;
					const email = window.prompt('Enter your email');
					if (!email) return;
					const password = window.prompt(
						'Enter your password (min 8 chars)'
					);
					if (!password) return;
					const name = email.split('@')[0] || 'User';
					const callbackURL = window.location.href;
					try {
						await authClient.signUp.email({
							name,
							email,
							password,
							callbackURL,
						});
					} catch (err) {
						// If the user already exists, fall back to sign-in
						await authClient.signIn.email({
							email,
							password,
							callbackURL,
						});
					}
				},
			}}
		/>
	);
}
