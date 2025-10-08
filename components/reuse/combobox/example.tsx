'use client';

import { useState } from 'react';
import { MyCombobox, MyComboboxOption } from './combobox';

const people = [
	{ id: 1, name: 'Tom Cook' },
	{ id: 2, name: 'Wade Cooper' },
	{ id: 3, name: 'Tanya Fox' },
	{ id: 4, name: 'Arlene Mccoy' },
	{ id: 5, name: 'Devon Webb' },
];

const roles = [
	'Developer',
	'Designer',
	'Manager',
	'Founder',
	'Product Manager',
	'Data Scientist',
	'DevOps Engineer',
	'QA Engineer',
];

export default function ComboboxExample() {
	const [selectedPerson, setSelectedPerson] = useState(people[1]);
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedRoles, setSelectedRoles] = useState([]);

	return (
		<div className='p-6 space-y-6 max-w-md'>
			<h2 className='text-2xl font-bold text-text'>Combobox Examples</h2>

			{/* Basic Single Select with Objects */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-text'>
					Select Person (Object Values)
				</label>
				<MyCombobox
					name='person'
					value={selectedPerson}
					onChange={setSelectedPerson}
					placeholder='Search people...'
					displayValue={person => person?.name || ''}
				>
					{people.map(person => (
						<MyComboboxOption key={person.id} value={person}>
							{person.name}
						</MyComboboxOption>
					))}
				</MyCombobox>
				<p className='text-xs text-textMuted'>
					Selected: {selectedPerson?.name || 'None'}
				</p>
			</div>

			{/* Basic Single Select with String Values */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-text'>
					Select Role (String Values)
				</label>
				<MyCombobox
					name='role'
					value={selectedRole}
					onChange={setSelectedRole}
					placeholder='Search or select role...'
				>
					{roles.map(role => (
						<MyComboboxOption key={role} value={role}>
							{role}
						</MyComboboxOption>
					))}
				</MyCombobox>
				<p className='text-xs text-textMuted'>
					Selected: {selectedRole || 'None'}
				</p>
			</div>

			{/* Multiple Select */}
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-text'>
					Multiple Roles
				</label>
				<MyCombobox
					name='roles'
					value={selectedRoles}
					onChange={setSelectedRoles}
					multiple
					placeholder='Search and select multiple roles...'
				>
					{roles.map(role => (
						<MyComboboxOption key={role} value={role}>
							{role}
						</MyComboboxOption>
					))}
				</MyCombobox>
				<p className='text-xs text-textMuted'>
					Selected:{' '}
					{selectedRoles.length > 0
						? selectedRoles.join(', ')
						: 'None'}
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
					<MyCombobox
						size='1'
						variant='outline'
						value={selectedRole}
						onChange={setSelectedRole}
						placeholder='Search roles...'
					>
						{roles.slice(0, 3).map(role => (
							<MyComboboxOption key={role} value={role}>
								{role}
							</MyComboboxOption>
						))}
					</MyCombobox>
				</div>

				{/* Large size, ghost variant */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-text'>
						Large Ghost
					</label>
					<MyCombobox
						size='4'
						variant='ghost'
						value={selectedRole}
						onChange={setSelectedRole}
						placeholder='Search roles...'
					>
						{roles.slice(0, 3).map(role => (
							<MyComboboxOption key={role} value={role}>
								{role}
							</MyComboboxOption>
						))}
					</MyCombobox>
				</div>

				{/* Disabled */}
				<div className='space-y-2'>
					<label className='block text-sm font-medium text-text'>
						Disabled
					</label>
					<MyCombobox
						disabled
						value='Disabled Option'
						placeholder='This is disabled...'
					>
						<MyComboboxOption value='option1'>
							Option 1
						</MyComboboxOption>
						<MyComboboxOption value='option2'>
							Option 2
						</MyComboboxOption>
					</MyCombobox>
				</div>
			</div>
		</div>
	);
}
