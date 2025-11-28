//"@/components/projectgrid.tsx"

import { Wrapper } from '@components/reuse/link';
import { montserrat } from '@/fonts/fonts';
import Image from 'next/image';
import { ProjectsGridProps } from '@/types/components';

export function ProjectsGrid({ projects }: ProjectsGridProps) {
	return (
		<div className='grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3 '>
			{projects.map(project => (
				<Wrapper
					target={`/projects/${project.slug}`}
					key={project._id}
					className='transition duration-300 ease-in-out border-2 border-gray-300 group rounded-xl hover:scale-105 hover:border-4 hover:border-gray-300'
				>
					{project.image && (
						<Image
							src={project.image}
							alt={project.name}
							width={750}
							height={300}
							className='object-cover rounded-lg group-hover:brightness-50 aspect-video'
						/>
					)}
					<div
						className={`${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}
					>
						{project.name}
					</div>
				</Wrapper>
			))}
		</div>
	);
}
