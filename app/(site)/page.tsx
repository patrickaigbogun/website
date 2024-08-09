// sanitytester\app\(site)\page.tsx
"use client"

import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingUI from "./components/loadingui";
import Hero from "./components/hero";


// Define the project type
interface Project {
	_id: string;
	name: string;
	slug: string;
	image?: string;
}

export default function Home() {
	const [projects, setProjects] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const fetchedProjects = await getProjects();
				setProjects(fetchedProjects);
			} catch (error) {
				console.error("Error fetching projects:", error);
				setError("Error loading projects");
			}
		};

		fetchProjects();
	}, []);

	if (error) {
		return <div className="text-white">{error}</div>;
	}

	if (!projects) {
		return <LoadingUI />; // loading state UI
	}

	return (
		<div className="mb-10">
			<Hero />

			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ">
				{projects.map((project: Project) => (
					<Link
						href={`/projects/${project.slug}`}
						key={project._id}
						className="border border-2 border-gray-300 rounded-lg p-1 hover:scale-105 hover:border-3 hover:border-green-500 hover:shadow-2xl transition">
						{project.image && (
							<Image
								src={project.image}
								alt={project.name}
								width={750}
								height={300}
								className="aspect-video object-cover rounded-lg"
							/>
						)}
						<div className="font-extrabold text-gray-300 group-hover:text-gray-300 my-1">
							{project.name}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
