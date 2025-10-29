'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Profile } from '@components/reuse/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/reuse/dialog';
import { ListRoot } from '@components/reuse/list';
import { Brand } from '@components/reuse/logo';
import { NavTabItem, NavTabRoot } from '@components/reuse/navigation';
import { ToggleMenu, ToggleTheme } from '@components/reuse/toggles';
import {
	CoinIcon,
	DotsThreeIcon,
	FileCodeIcon,
	HouseIcon,
	ScalesIcon,
	StudentIcon,
} from '@phosphor-icons/react';
import { Flex, Text } from '@radix-ui/themes';
import { ActionButton } from '../reuse/button/action-button';

export default function LandingHeader() {
	const isMobile = useIsMobile(768);
	return (
		<header className='sticky top-0 z-20 p-0 min-w-fit min-h-fit '>
			{isMobile ? <MobileHeader /> : <DesktopHeader />}
		</header>
	);
}

export function DesktopHeader() {
	return (
		<div className='w-full p-4 align-middle flex flex-row items-center justify-between '>
			<Brand
				classname='backdrop:filter backdrop-blur-md bg-stone-500/30 px-3 py-2'
				src='./logo-black.png'
				alt='Oti Blog Logo'
				size={'xs'}
				rounded={'full'}
			>
				Levra
			</Brand>
			<NavTabRoot>
				<NavTabItem label='Tech' href='#tech' />
				<NavTabItem label='Philosophy' href='#philosophy' />
				<NavTabItem label='Art' href='#art' />
			</NavTabRoot>
			<ActionButton
				className='backdrop:filter backdrop-blur-md bg-stone-500/30'
				rounded={'full'}
			>
				<Profile />
				<ToggleTheme size='md' />
			</ActionButton>
		</div>
	);
}

export function MobileHeader() {
	return (
		<div className='w-full p-4 px-6 flex flex-row items-center justify-between '>
			<Flex direction={'row'} align={'center'}>
				<Brand
					classname='backdrop:filter backdrop-blur-md bg-stone-500/30 px-3 py-2'
					src='./logo-black.png'
					alt='Oti Blog Logo'
					size={'xs'}
					rounded={'full'}
				>
					Levra
				</Brand>
			</Flex>
			<ActionButton
				className='backdrop:filter backdrop-blur-md bg-stone-500/30'
				rounded={'full'}
			>
				<Profile />
				<ToggleTheme size='sm' />
				<Dialog>
					<DialogTrigger>
						<ToggleMenu asChild>
							<DotsThreeIcon size={28} weight={'bold'} />
						</ToggleMenu>
					</DialogTrigger>
					<DialogContent
						title='Navigation Menu'
						description='Click the tabs to find your way around'
					>
						<ListRoot accordion>
							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<HouseIcon size={28} weight={'regular'} />
									<Text>Home</Text>
								</Flex>
							</ListRoot.Item>
							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<CoinIcon size={28} weight={'regular'} />
									<Text>Pricing</Text>
								</Flex>
								<ListRoot className='mt-2 ml-6'>
									<ListRoot.Item>
										<a
											href='#tech'
											className='hover:underline'
										>
											Tech
										</a>
									</ListRoot.Item>
									<ListRoot.Item>
										<a
											href='#philosophy'
											className='hover:underline'
										>
											Philosophy
										</a>
									</ListRoot.Item>
								</ListRoot>
							</ListRoot.Item>

							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<StudentIcon size={28} weight={'regular'} />
									<Text>Tutorials</Text>
								</Flex>
								<ListRoot className='mt-2 ml-6'>
									<ListRoot.Item>
										<a
											href='#art'
											className='hover:underline'
										>
											Art
										</a>
									</ListRoot.Item>
								</ListRoot>
							</ListRoot.Item>

							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<ScalesIcon size={28} weight={'regular'} />
									<Text>Legal</Text>
								</Flex>
								<ListRoot className='mt-2 ml-6'>
									<ListRoot.Item>
										<a
											href='/terms'
											className='hover:underline'
										>
											Terms of Service
										</a>
									</ListRoot.Item>
									<ListRoot.Item>
										<a
											href='/privacy'
											className='hover:underline'
										>
											Privacy Policy
										</a>
									</ListRoot.Item>
								</ListRoot>
							</ListRoot.Item>
						</ListRoot>
					</DialogContent>
				</Dialog>
			</ActionButton>
		</div>
	);
}
