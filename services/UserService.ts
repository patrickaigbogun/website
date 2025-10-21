import { db } from '@/config/db/orms/client';
import { user } from '@/orm/schema';
import { eq, InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof user>;
type NewUser = InferInsertModel<typeof user>;
type UserRole = NonNullable<NewUser['role']>;

/**
 * @fileoverview This file contains user-related services and functions.
 */

/**
 * Fetches a user by their ID.
 * @param userId - The ID of the user to fetch.
 * @returns The user object or null if not found.
 */
export async function getUserById(userId: string): Promise<User | null> {
	const [row] = await db.select().from(user).where(eq(user.id, userId));
	return row || null;
}

/**
 * Creates a new user.
 * @param id - The ID of the new user.
 * @param email - The email of the new user.
 * @param role - The role of the new user.
 * @returns The created user object.
 */
export async function createUser(input: {
	id: string;
	name: string;
	email: string;
	role?: UserRole;
	image?: string;
}): Promise<User> {
	const { id, name, email, role, image } = input;
	const [newUser] = await db
		.insert(user)
		.values({ id, name, email, role: role ?? 'user', image })
		.returning();
	return newUser;
}

/**
 * Deletes a user by their ID.
 * @param userId - The ID of the user to delete.
 * @returns void
 */
export async function deleteUser(userId: string): Promise<void> {
	await db.delete(user).where(eq(user.id, userId));
}
