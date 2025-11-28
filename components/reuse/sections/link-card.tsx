import { Card } from '@radix-ui/themes';
import { Wrapper } from '../link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function LinkCard() {
	return (
		<Wrapper target={'src'} title={'tits'} className=''>
			<Card variant={'ghost'} className='p-1 flex flex-row space-y-2'>
				<Image
					src={'/hero/poetry.webp'}
					sizes={'auto'}
					fill
					alt='an image'
					loading='eager'
					className={cn('object-cover')}
				></Image>
			</Card>
		</Wrapper>
	);
}
