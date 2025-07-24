'use client';

import { NextStudio } from 'next-sanity/studio';
import { adminConfig } from '@/config/cms/providers/admin';
export default function AdminPage() {
	return <NextStudio config={adminConfig} />;
}
