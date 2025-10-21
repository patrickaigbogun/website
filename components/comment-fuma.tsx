'use client';
import { signIn } from '@/config/auth/providers/client';
import { Comments } from '@fuma-comment/react';

export function CommentsWithAuth() {
	return (
		<Comments
			apiUrl='/api/v1/comments'
			// comments are grouped by page
			page='default'
			auth={{
				type: 'api',
				// function to sign in
				signIn: () => signIn('github'),
			}}
		/>
	);
}
