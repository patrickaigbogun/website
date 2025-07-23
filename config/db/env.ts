import { getServerEnv } from 'x-env-helpers';

export const dbKeys = {
	url: getServerEnv('DB_URL_RELATIVE'),
};
