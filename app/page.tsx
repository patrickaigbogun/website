import { getProjects } from "@/sanity/sanity-utils";

export default async function Home() {
	try{const projects = await getProjects();
	console.log(projects); // Check if projects are fetched correctly

	return (
		<div>
			{projects.map((project) => (
				<div key={project._id}>{project.name}</div>
			))}
		</div>
	);
} catch (error) {
	console.error("Error fetching projects:", error);
	return <div>Error loading projects</div>;
}}