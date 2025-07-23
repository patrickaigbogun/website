import { getServerEnv } from 'x-env-helpers';

export const muxKeys = {
	tokenId: getServerEnv('MUX_TOKEN_ID'),
	tokenSecret: getServerEnv('MUX_TOKEN_SECRET'),
	webhookSecret: getServerEnv('MUX_WEBHOOK_SECRET'),
};
