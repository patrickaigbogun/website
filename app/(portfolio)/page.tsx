//"@/app/(site)/page.tsx"

import { getProjects } from '@/sanity/sanity-utils';

import { Hero } from '@/components/hero';
import { ProjectsGrid } from '@/components/projectsgrid';

export default async function PortfolioHome() {
	const projects = await getProjects();
	return (
		<div className='mb-10'>
			<Hero />

			{/* Show loading state while the projects are being fetched */}
			<ProjectsGrid projects={projects} />
		</div>
	);
}
