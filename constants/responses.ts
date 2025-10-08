import { Response } from '@/types/lib/responses';

export const errResponse: Response<null> = {
	status: 500,
	success: 'fail',
	message: 'An error occurred',
};
