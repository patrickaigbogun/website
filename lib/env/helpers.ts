// lib/config/env-helpers.ts

import { createEnvHelpers } from '@patrickaigbogunoti/x-env';
import type { EnvKey, PrivateEnvKey, PublicEnvKey } from 'x-env-types';

export const { getServerEnv, getClientEnv } = createEnvHelpers<
	// @ts-ignore - EnvKey type constraint issue, but works correctly at runtime
	EnvKey,
	PublicEnvKey,
	PrivateEnvKey
>();
