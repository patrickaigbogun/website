import { HotToastProvider } from '@/components/providers/toast';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: "Patrick Aigbogun's portfolio",
	description:
		"Patrick Aigbogun's personal website made with nextjs and sanityio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange={false}
				>
					<Theme radius='full'>
						<HotToastProvider>{children}</HotToastProvider>
						{/* <ThemePanel /> */}
					</Theme>
				</ThemeProvider>
			</body>
		</html>
	);
}
