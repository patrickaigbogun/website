// sanitytester\app\(site)\projects\[project]\page.tsx

"use client"

import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import LoadingUI from "../../components/loadingui";
import { montserrat } from "@/fonts/fonts";

type Props = {
	params: { project: string }
};

export default function Project({ params }: Props) {

	// const slug = params.project;


	const [project, setProject] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const fetchedProject = await getProject(params.project);
			setProject(fetchedProject);
			} catch (error) {
				console.error("error fetching project: ", error);
				setError("error fetching project");
				
			}
		};

		fetchProject();
	}, [params.project]);

	if (error) {
		return <div className="text-white">{error}</div>
	}

	if (!project) {
		return <LoadingUI />; // Placeholder for loading state
	}

	return (
		<div className="mb-10" >

			<header className=" my-2 p-0 flex items-center justify-between gap-2" >
				<button
					onClick={() => window.history.back()}
					title="Go back"
					className="m-0 bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition"
				>
					Go back
				</button>
				<Link href={project.url} title="View project" target="_blank" rel="noopener noreferrer" className=" m-0 bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition" >
					View Project
				</Link>
			</header>
			<div className="w-full md:w-[75%] mx-auto">
				<h1 className={`my-14 text-white text-5xl font-bold ${montserrat.className}` }>
					{project.name}
				</h1>

				<div className="flex justify-center">
					<div className="m-0 p-0">
						{/* Image here */}
						<Image
							src={project.image}
							alt={project.name}
							width={960}
							height={540}
							className="aspect-video my-10 border-2 border-gray-700 object-cover rounded-xl"
						/>
					</div>
				</div>

				{/* Content here */}
				<div className="prose text-lg text-white">
					<PortableText value={project.content} />
					<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus quibusdam assumenda voluptates! Quis, amet itaque ratione architecto quisquam earum odio ducimus corrupti aliquam libero placeat quidem error mollitia assumenda esse!</p>
				</div>
			</div>


		</div>

	)
}