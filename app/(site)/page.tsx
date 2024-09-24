
import { getProjects } from "@/sanity/sanity-utils";

import LoadingUI from "@/components/loadingui";
import { Hero } from "@/components/hero";
import { Suspense } from "react";
import { ProjectsGrid } from "@/components/ProjectsGrid";



export default async function PortfolioHome() {
	const projects = await getProjects();
	return (
		<div className="mb-10">
			<Hero />

			{/* Show loading state while the projects are being fetched */}
			<Suspense fallback={<LoadingUI />}>
				<ProjectsGrid projects={projects} />
			</Suspense>
		</div>
	);
}
