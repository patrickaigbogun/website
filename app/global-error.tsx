'use client';

import { ArrowCircleDownIcon, LinkBreakIcon } from '@phosphor-icons/react';
import { Container, IconButton } from '@radix-ui/themes';

export default function Error({
	searchParams,
}: {
	searchParams: { error?: string };
}) {
	const error = searchParams.error;

	return (
		<Container
			className='min-h-screen flex items-center justify-center bg-bgDark'
			align={'center'}
		>
			<div className='flex flex-col items-center space-y-12'>
				<IconButton color='red' variant='ghost'>
					<LinkBreakIcon size={96} weight='duotone' />
				</IconButton>
				<h2 className='text-center text-6xl font-extrabold text-white'>
					Error logging you in
				</h2>
				<p className='text-gray-500 text-center text-base flex flex-row items-center space-x-2 '>
					<p>This seems to be the reason below</p>{' '}
					<ArrowCircleDownIcon weight='duotone' size={28} />
				</p>
				<p>
					<span className='w-fit mx-auto p-3 rounded-full bg-white/10 text-white font-bold border border-white/20'>
						{error}
					</span>
				</p>
			</div>
		</Container>
	);
}
