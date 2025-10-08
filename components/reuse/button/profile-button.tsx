'use client';

import { Profile } from '@components/reuse/avatar';
import { Button, Flex } from '@radix-ui/themes';
import { Popover } from '../popover';

export function ProfileButton() {
	return (
		<Popover contentClassName='p-2 rounded-lg' trigger={<Avatar />}>
			<Flex direction='column' gap='3'>
				<button className='font-medium items-center text-center px-3 py-2 border-[1.5px] border-bgLight dark:border-bgDark rounded-3xl bg-bgDark dark:bg-bgLight hover:shadow-md hover:scale-105 ease-in-out duration-300 transition-all '>
					Profile
				</button>
				<Button
					variant={'soft'}
					color={'red'}
					className=' bg-bgDark dark:bg-bgLight hover:shadow-md hover:scale-105 ease-in-out duration-300 transition-all '
				>
					Logout
				</Button>
			</Flex>
		</Popover>
	);
}

const Avatar = () => {
	return (
		<Profile
			src='https://via.placeholder.com/150'
			alt='Profile Picture'
			size='3'
			classname='hover:bg-bgDark/25'
			radius='large'
			iconcolor='text-text'
			weight='duotone'
			iconsize={32}
		/>
	);
};
