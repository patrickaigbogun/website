import { emailKeys } from '@/config/email/env';
import { Resend } from 'resend';

const apiKey = emailKeys.apiKey;
export const emailConfig = new Resend(apiKey);
