'use client';

import { useState } from 'react';
import { MyRadioGroup, MyRadioOption } from './radio';

const RadioExamples = () => {
	const [plan, setPlan] = useState('pro');
	const [theme, setTheme] = useState('dark');
	const [layout, setLayout] = useState('grid');

	return (
		<div className='p-8 space-y-12'>
			<h1 className='text-2xl font-bold'>MyRadioGroup Examples</h1>

			{/* Example 1: Card-based selection with tick indicator */}
			<div>
				<h2 className='text-lg font-semibold mb-4'>
					Pricing Plans (Tick Indicator)
				</h2>
				<MyRadioGroup
					value={plan}
					onChange={setPlan}
					orientation='horizontal'
					gap='4'
					indicatorVariant='tick'
				>
					<MyRadioOption value='basic'>
						<div className='p-6 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<h3 className='text-lg font-semibold'>Basic</h3>
							<p className='text-textMuted'>$9/month</p>
							<ul className='mt-3 space-y-1 text-sm text-textMuted'>
								<li>• 5 projects</li>
								<li>• 10GB storage</li>
								<li>• Email support</li>
							</ul>
						</div>
					</MyRadioOption>

					<MyRadioOption value='pro'>
						<div className='p-6 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<h3 className='text-lg font-semibold'>Pro</h3>
							<p className='text-textMuted'>$29/month</p>
							<ul className='mt-3 space-y-1 text-sm text-textMuted'>
								<li>• Unlimited projects</li>
								<li>• 100GB storage</li>
								<li>• Priority support</li>
							</ul>
						</div>
					</MyRadioOption>

					<MyRadioOption value='enterprise'>
						<div className='p-6 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<h3 className='text-lg font-semibold'>
								Enterprise
							</h3>
							<p className='text-textMuted'>$99/month</p>
							<ul className='mt-3 space-y-1 text-sm text-textMuted'>
								<li>• Everything in Pro</li>
								<li>• Custom integrations</li>
								<li>• Dedicated support</li>
							</ul>
						</div>
					</MyRadioOption>
				</MyRadioGroup>
			</div>

			{/* Example 2: Simple options with circle indicator */}
			<div>
				<h2 className='text-lg font-semibold mb-4'>
					Theme Selection (Circle Indicator)
				</h2>
				<MyRadioGroup
					value={theme}
					onChange={setTheme}
					indicatorVariant='circle'
					gap='3'
				>
					<MyRadioOption value='light'>
						<div className='flex items-center p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<div className='w-8 h-8 bg-white border border-border rounded mr-3'></div>
							<div>
								<h3 className='font-medium'>Light Theme</h3>
								<p className='text-sm text-textMuted'>
									Clean and bright interface
								</p>
							</div>
						</div>
					</MyRadioOption>

					<MyRadioOption value='dark'>
						<div className='flex items-center p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<div className='w-8 h-8 bg-gray-900 border border-border rounded mr-3'></div>
							<div>
								<h3 className='font-medium'>Dark Theme</h3>
								<p className='text-sm text-textMuted'>
									Easy on the eyes
								</p>
							</div>
						</div>
					</MyRadioOption>

					<MyRadioOption value='auto'>
						<div className='flex items-center p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors'>
							<div className='w-8 h-8 bg-gradient-to-r from-white to-gray-900 border border-border rounded mr-3'></div>
							<div>
								<h3 className='font-medium'>Auto Theme</h3>
								<p className='text-sm text-textMuted'>
									Follows system preference
								</p>
							</div>
						</div>
					</MyRadioOption>
				</MyRadioGroup>
			</div>

			{/* Example 3: Layout selection with check indicator */}
			<div>
				<h2 className='text-lg font-semibold mb-4'>
					Layout Options (Check Indicator)
				</h2>
				<MyRadioGroup
					value={layout}
					onChange={setLayout}
					orientation='horizontal'
					gap='3'
					indicatorVariant='check'
				>
					<MyRadioOption value='list'>
						<div className='p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors text-center'>
							<div className='w-12 h-12 bg-bgDark rounded mx-auto mb-2 flex flex-col gap-1 p-2'>
								<div className='bg-border rounded h-2'></div>
								<div className='bg-border rounded h-2'></div>
								<div className='bg-border rounded h-2'></div>
							</div>
							<span className='text-sm font-medium'>List</span>
						</div>
					</MyRadioOption>

					<MyRadioOption value='grid'>
						<div className='p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors text-center'>
							<div className='w-12 h-12 bg-bgDark rounded mx-auto mb-2 grid grid-cols-2 gap-1 p-2'>
								<div className='bg-border rounded'></div>
								<div className='bg-border rounded'></div>
								<div className='bg-border rounded'></div>
								<div className='bg-border rounded'></div>
							</div>
							<span className='text-sm font-medium'>Grid</span>
						</div>
					</MyRadioOption>

					<MyRadioOption value='cards'>
						<div className='p-4 border border-border rounded-lg bg-bg hover:bg-bgDark transition-colors text-center'>
							<div className='w-12 h-12 bg-bgDark rounded mx-auto mb-2 flex gap-1 p-2'>
								<div className='bg-border rounded flex-1'></div>
								<div className='bg-border rounded flex-1'></div>
							</div>
							<span className='text-sm font-medium'>Cards</span>
						</div>
					</MyRadioOption>
				</MyRadioGroup>
			</div>

			{/* Example 4: Custom shaped components without indicators */}
			<div>
				<h2 className='text-lg font-semibold mb-4'>
					Custom Shapes (No Indicators)
				</h2>
				<MyRadioGroup
					value={layout}
					onChange={setLayout}
					orientation='horizontal'
					gap='4'
					showIndicator={false}
				>
					<MyRadioOption value='circle'>
						<div className='w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105 transition-transform flex items-center justify-center text-white font-bold'>
							A
						</div>
					</MyRadioOption>

					<MyRadioOption value='square'>
						<div className='w-20 h-20 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 hover:scale-105 transition-transform flex items-center justify-center text-white font-bold'>
							B
						</div>
					</MyRadioOption>

					<MyRadioOption value='diamond'>
						<div className='w-20 h-20 rotate-45 bg-gradient-to-br from-red-500 to-pink-600 hover:scale-105 transition-transform flex items-center justify-center text-white font-bold'>
							<span className='-rotate-45'>C</span>
						</div>
					</MyRadioOption>
				</MyRadioGroup>
			</div>

			{/* Selected Values Display */}
			<div className='p-4 bg-bgDark rounded-lg'>
				<h3 className='font-semibold mb-2'>Selected Values:</h3>
				<ul className='space-y-1 text-sm'>
					<li>Plan: {plan}</li>
					<li>Theme: {theme}</li>
					<li>Layout: {layout}</li>
				</ul>
			</div>
		</div>
	);
};

export default RadioExamples;
