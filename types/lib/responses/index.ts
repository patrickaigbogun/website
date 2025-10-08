export type Response<T> = {
	status: number;
	success: 'ok' | 'fail';
	message: string;
	data?: T;
};
