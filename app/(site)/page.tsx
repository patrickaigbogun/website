
import LoadingUI from "@/components/loadingui";
import Hero from "@/components/Hero";
import { Suspense } from "react";
import ProjectsGrid from "@/components/ProjectsGrid";



export default function PortfolioHome() {
	return (
		<div className="mb-10">
			<Hero />

			{/* Show loading state while the projects are being fetched */}
			<Suspense fallback={<LoadingUI />}>
				<ProjectsGrid />
			</Suspense>
		</div>
	);
}
