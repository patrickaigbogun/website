'use client';

import { Theme, ThemePanel } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import React from 'react';

export default function RadixThemeProvider({
	children,
	showPanel = false,
}: {
	children: React.ReactNode;
	showPanel?: boolean;
}) {
	const { resolvedTheme } = useTheme();
	const appearance = resolvedTheme === 'dark' ? 'dark' : 'light';

	return (
		<Theme appearance={appearance} radius='full'>
			{children}
			{showPanel ? <ThemePanel /> : null}
		</Theme>
	);
}
