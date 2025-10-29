'use client';

import { Drawer } from 'vaul';
import React from 'react';

export default function VaulDrawer() {
	return (
		<Drawer.Root>
			<Drawer.Trigger className='relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-bg-dark/5 dark:hover:bg-[#1A1A19] dark:text-white'>
				Open Drawer
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none'>
					<div className='p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto'>
						<div className='max-w-md mx-auto space-y-4'>
							<div
								aria-hidden
								className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8'
							/>
							<Drawer.Title className='font-medium mb-4 text-gray-900'>
								Ira Glass on Taste
							</Drawer.Title>
							<p className='text-gray-600'>
								Nobody tells this to people who are beginners, I
								wish someone told me. All of us who do creative
								work, we get into it because we have good taste.
							</p>
							<p className='text-gray-600'>
								But there is this gap. For the first couple
								years you make stuff, it’s just not that good.
								It’s trying to be good, it has potential, but
								it’s not. But your taste, the thing that got you
								into the game, is still killer. And your taste
								is why your work disappoints you. A lot of
								people never get past this phase, they
								quit.{' '}
							</p>
							<p className='text-gray-600'>
								Most people I know who do interesting, creative
								work went through years of this. We know our
								work doesn’t have this special thing that we
								want it to have. We all go through this. And if
								you are just starting out or you are still in
								this phase, you gotta know its normal and the
								most important thing you can do is do a lot of
								work
							</p>
							<p className='text-gray-600'>
								Put yourself on a deadline so that every week
								you will finish one story. It is only by going
								through a volume of work that you will close
								that gap, and your work will be as good as your
								ambitions. And I took longer to figure out how
								to do this than anyone I’ve ever met. It’s gonna
								take awhile. It’s normal to take awhile. You’ve
								just gotta fight your way through.
							</p>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
