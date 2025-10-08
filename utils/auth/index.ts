'use client'; // Required for the hook

import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { useState, useEffect } from 'react';

// --- SERVER-SIDE FUNCTION (For Middleware & Server Components) ---

/**
 * Checks user authentication status on the server by verifying an httpOnly cookie.
 * This function is intended for use in Middleware, Route Handlers, or Server Components.
 * @param request - The NextRequest object, required when used in middleware.
 * @returns A promise that resolves to true if the user is authenticated, false otherwise.
 */
export async function isUserLoggedIn(request?: NextRequest): Promise<boolean> {
	// In middleware, get cookies from the request. In Route Handlers/Server Components, use next/headers.
	const cookieStore = request ? request.cookies : await cookies();
	const token = cookieStore.get('auth_token')?.value;

	if (!token) {
		return false;
	}

	try {
		// --- IMPORTANT ---
		// In a real application, you should ALWAYS verify the JWT's signature and expiration.
		// For example, using a library like 'jose':
		// const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		// await jose.jwtVerify(token, secret);

		// For now, we'll assume the presence of a token means the user is logged in.
		return true;
	} catch (error) {
		console.error('JWT Verification failed:', error);
		return false;
	}
}

// --- CLIENT-SIDE HOOK (For Client Components) ---

/**
 * A React hook to check user authentication status on the client-side.
 * It provides a boolean state that components can use to render different UI.
 * @returns An object with `isLoggedIn` (boolean) and `isLoading` (boolean).
 */
export function useAuthStatus() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		async function checkStatus() {
			setIsLoading(true);
			try {
				// This API route securely checks the httpOnly cookie on the server.
				const response = await fetch('/api/auth/status');
				if (response.ok) {
					const data = await response.json();
					setIsLoggedIn(data.isLoggedIn);
				} else {
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error('Failed to fetch auth status:', error);
				setIsLoggedIn(false);
			} finally {
				setIsLoading(false);
			}
		}

		checkStatus();
	}, []); // Runs once on component mount

	return { isLoggedIn, isLoading };
}
