'use client'

import { montserrat } from '@/fonts/fonts'
import { getProjects } from '@/sanity/sanity-utils'
import { Project } from '@/types/Projects'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function BlogHome() {
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
	return (
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
	)
}
