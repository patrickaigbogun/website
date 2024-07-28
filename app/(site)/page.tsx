// sanitytester\app\(site)\page.tsx


import { getProjects } from "@/sanity/sanity-utils"; 
import Image from "next/image";
import Link from "next/link";


export const revalidate = 5; // Revalidate every 60 seconds

export default async function Home() {
	try {
		const projects = await getProjects();
		console.log(projects); // Check if projects are fetched correctly

		return (
			<div>
				<h1 className="text-7xl font-extrabold text-white">
					Hello I&apos;m{" "}
					<span className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent">
						Oti!
					</span>
				</h1>
				<p className="mt-3 text-xl text-white">
					Welcome to my portfolio!
					<br /><i><sub>displayed below are my most confident works</sub></i>
				</p>
				<h2 className="mt-24 font-bold text-white text-3xl">
					My Projects
				</h2>

				<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<Link
							href={`/projects/${project.slug}`}
							key={project._id}
							className="border border-gray-300 rounded-lg p-1 hover:scale-105 hover:border-3 hover:border-gray-200 hover:shadow-2xl transition">
							{project.image && (
								<Image
									src={project.image}
									alt={project.name}
									width={750}
									height={300}
									className="aspect-video object-cover rounded-lg border border-gray-500"
								/>
							)}
							<div className="font-extrabold text-gray-300 group-hover:text-gray-300">
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
