'use client';

import { NextStudio } from 'next-sanity/studio';
import { adminConfig } from '@/config/cms/providers/client';
export default function AdminPage() {
	return <NextStudio config={adminConfig} />;
}
