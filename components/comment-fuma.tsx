'use client';
import { signIn } from '@/config/auth/providers/client';
import { Comments } from '@fuma-comment/react';

export function CommentsWithAuth() {
	return (
		<Comments
			// comments are grouped by page
			page='default'
			auth={{
				type: 'api',
				// function to sign in
				signIn: () => void signIn('github'),
			}}
		/>
	);
}
