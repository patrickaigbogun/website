'use client';

import { useState } from 'react';
import { MyListbox, MyListboxOption } from './listbox';

export default function ListboxExample() {
	const [status, setStatus] = useState('active');
	const [priority, setPriority] = useState(['high']);
	const [category, setCategory] = useState(null);

	return (
		<div className='p-6 space-y-6 max-w-md'>
			<h2 className='text-2xl font-bold text-text'>Listbox Examples</h2>

			{/* Basic Single Select */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-text'>
					Status
				</label>
				<MyListbox
					name='status'
					value={status}
					onChange={setStatus}
					placeholder='Select status...'
				>
					<MyListboxOption value='active'>Active</MyListboxOption>
					<MyListboxOption value='paused'>Paused</MyListboxOption>
					<MyListboxOption value='delayed'>Delayed</MyListboxOption>
					<MyListboxOption value='canceled'>Canceled</MyListboxOption>
				</MyListbox>
				<p className='text-xs text-textMuted'>Selected: {status}</p>
			</div>

			{/* Multiple Select */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-text'>
					Priority (Multiple)
				</label>
				<MyListbox
					name='priority'
					value={priority}
					onChange={setPriority}
					multiple
					placeholder='Select priorities...'
				>
					<MyListboxOption value='low'>Low Priority</MyListboxOption>
					<MyListboxOption value='medium'>
						Medium Priority
					</MyListboxOption>
					<MyListboxOption value='high'>
						High Priority
					</MyListboxOption>
					<MyListboxOption value='urgent'>Urgent</MyListboxOption>
				</MyListbox>
				<p className='text-xs text-textMuted'>
					Selected:{' '}
					{priority.length > 0 ? priority.join(', ') : 'None'}
				</p>
			</div>

			{/* Different Sizes & Variants */}
			<div className='space-y-4'>
				<h3 className='text-lg font-semibold text-text'>
					Size & Variant Examples
				</h3>

				{/* Small size, outline variant */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-text'>
						Small Outline
					</label>
					<MyListbox
						size='1'
						variant='outline'
						value={category}
						onChange={setCategory}
						placeholder='Select category...'
					>
						<MyListboxOption value='design'>Design</MyListboxOption>
						<MyListboxOption value='development'>
							Development
						</MyListboxOption>
						<MyListboxOption value='marketing'>
							Marketing
						</MyListboxOption>
					</MyListbox>
				</div>

				{/* Large size, ghost variant */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-text'>
						Large Ghost
					</label>
					<MyListbox
						size='4'
						variant='ghost'
						value={category}
						onChange={setCategory}
						placeholder='Select category...'
					>
						<MyListboxOption value='design'>Design</MyListboxOption>
						<MyListboxOption value='development'>
							Development
						</MyListboxOption>
						<MyListboxOption value='marketing'>
							Marketing
						</MyListboxOption>
					</MyListbox>
				</div>

				{/* Disabled */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-text'>
						Disabled
					</label>
					<MyListbox
						disabled
						value='disabled'
						placeholder='This is disabled...'
					>
						<MyListboxOption value='option1'>
							Option 1
						</MyListboxOption>
						<MyListboxOption value='option2'>
							Option 2
						</MyListboxOption>
					</MyListbox>
				</div>
			</div>
		</div>
	);
}
