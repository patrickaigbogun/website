// sanitytester\app\(site)\page.tsx
"use client"

import { getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingUI from "./components/loadingui";
import Hero from "./components/hero";
import { montserrat } from "@/fonts/fonts";
import { Project } from "@/types/Projects";
// import BgDarkDiv from "./components/BgDarkDiv";



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
		return <div className="text-white">
			<h2>An error occured while getting projects, this could be the reason;</h2>
			{error}
		</div>;
	}

	if (!projects) {
		return <LoadingUI />; // loading state UI
	}

	return (
		<div className="mb-10">
			<Hero />

		{/* TODO: implement conditional classnames with all your reuseable components */}
			{/* <BgDarkDiv
				reuse=""
			/> */}
			
			<div className="grid grid-cols-1 gap-8 mt-5 md:grid-cols-2 lg:grid-cols-3 ">
				{projects.map((project: Project) => (
					<Link
						href={`/projects/${project.slug}`}
						key={project._id}
						className="transition duration-300 ease-in-out border-2 border-gray-300 group rounded-xl hover:scale-105 hover:border-4 hover:border-gray-300">
						{project.image && (
							<Image
								src={project.image}
								alt={project.name}
								width={750}
								height={300}
								className="object-cover rounded-lg group-hover:brightness-50 aspect-video"
							/>
						)}
						<div className={` ${montserrat.className} font-bold text-gray-300/50 group-hover:text-gray-300 m-2`}>
							{project.name}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
