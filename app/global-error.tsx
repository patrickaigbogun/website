'use client';

import { ArrowCircleDownIcon, LinkBreakIcon } from '@phosphor-icons/react';
import { IconButton } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html className='bg-bg-dark'>
			<body className='bg-bg-dark'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange={false}
				>
					<center className='min-h-screen flex items-center justify-center bg-bg-dark'>
						<div className='flex flex-col items-center space-y-12'>
							<IconButton color='red' variant='ghost'>
								<LinkBreakIcon size={96} weight='duotone' />
							</IconButton>
							<h2 className='text-center text-6xl font-extrabold text-white'>
								Something went wrong!{' '}
							</h2>
							<p className='text-gray-500 text-center text-base flex flex-row items-center space-x-2 '>
								<span>This seems to be the reason below</span>{' '}
								<ArrowCircleDownIcon
									weight='duotone'
									size={28}
								/>
							</p>
							<button onClick={() => reset()}>Try again</button>
						</div>
					</center>
				</ThemeProvider>
			</body>
		</html>
	);
}
