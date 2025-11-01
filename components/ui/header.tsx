'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Profile } from '@components/reuse/button';
import { Dialog, DialogContent, DialogTrigger } from '@components/reuse/dialog';
import { ListRoot } from '@components/reuse/list';
import { Brand } from '@components/reuse/logo';
import { NavTabItem, NavTabRoot } from '@components/reuse/navigation';
import { ToggleMenu, ToggleTheme } from '@components/reuse/toggles';
import {
	BugDroidIcon,
	CoinIcon,
	DotsThreeIcon,
	HouseIcon,
	PaintBrushIcon,
	ScalesIcon,
} from '@phosphor-icons/react';
import { Flex, Text } from '@radix-ui/themes';
import { ActionButton } from '../reuse/button/action-button';
import { montserrat } from '@/fonts/fonts';

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
				<NavTabItem
					className='text-text font-bold text-base'
					label='Tech'
					href='#tech'
				/>
				<NavTabItem
					className='text-text font-bold text-base'
					label='Philosophy'
					href='#philosophy'
				/>
				<NavTabItem
					className='text-text font-bold text-base'
					label='Art'
					href='#art'
				/>
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
					classname={`backdrop:filter backdrop-blur-md bg-stone-500/30 px-3 py-2 ${montserrat.className} `}
					src='./logo-black.png'
					alt='Oti Blog Logo'
					size={'xs'}
					rounded={'full'}
				>
					Oti
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
									<Text weight={'bold'}>Home</Text>
								</Flex>
							</ListRoot.Item>
							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<BugDroidIcon
										size={28}
										weight={'regular'}
									/>
									<Text weight={'bold'}>Tech</Text>
								</Flex>
							</ListRoot.Item>

							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<CoinIcon size={28} weight={'regular'} />
									<Text weight={'bold'}>Philosophy</Text>
								</Flex>
							</ListRoot.Item>

							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<PaintBrushIcon
										size={28}
										weight={'regular'}
									/>
									<Text weight={'bold'}>Art</Text>
								</Flex>
							</ListRoot.Item>

							<ListRoot.Item>
								<Flex
									direction={'row'}
									align={'center'}
									className='space-x-2'
								>
									<ScalesIcon size={28} weight={'regular'} />
									<Text weight={'bold'}>Legal</Text>
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
