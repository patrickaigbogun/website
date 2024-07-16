

import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	try {
		const projects = await getProjects();
		console.log(projects); // Check if projects are fetched correctly

		return (
			<div >
				<h1 className="text-7xl font-extrabold text-white">
					Hello I&apos;m{" "}
					<span className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent">
						Oti!
					</span>
				</h1>
				<p className="mt-3 text-xl text-white">
					{" "}
					Aloha everyone! Check out my projects{" "}
				</p>
				<h2 className="mt-24 font-bold text-white text-3xl">
					My Projects
				</h2>

				<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" >
				{projects.map((project) => (
					<Link
					href={`/projects/${project.slug}`}
						key={project._id}
						className="border-2 border-gray-500 rounded-lg p-1 hover:scale-105 hover:border-blue-500 transition">
						{project.image &&(
							<Image
							src = {project.image}
							alt = {project.name}
							width = {750}
							height = {300}
							className = 'aspect-video object-cover rounded-lg border border-gray-500'
							/>
						)}	
						<div className="font-extrabold text-gray-300">
							{project.name}
						</div>
					</Link>
				))}
				</div>
				
			</div>
		);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return <div>Error loading projects</div>;
	}
}
