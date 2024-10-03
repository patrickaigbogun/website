// sanitytester\app\(site)\projects\[project]\page.tsx


import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
// import Link from 'next/link';
import LoadingUI from "@/components/loadingui";
import { montserrat } from "@/fonts/fonts";
import { NavBtn } from "@/components/NavBtn";
import { LinkButton } from "@/components/LinkButton";
import { Suspense } from "react";

type Props = {
	params: { project: string }
};

export default async function Project({ params }: Props) {

	const project = await getProject(params.project);


	return (
		<div className="mb-10" >

			<header className="flex items-center justify-between gap-2 p-0 my-2 " >
				<NavBtn direction="back" >Go Back</NavBtn>
				{/* {project.url} */}
				{/* View project */}
				{/* View Project */}

				<LinkButton
					target={project.url}
					title='View project'
				>
					View Project</LinkButton>
			</header>
			<Suspense fallback={<LoadingUI />}>
				<div className="w-full md:w-[75%] mx-auto">
					<h1 className={`my-14 text-white text-5xl font-bold ${montserrat.className}`}>
						{project.name}
					</h1>

					<div className="flex justify-center">
						<div className="p-0 m-0">
							{/* Image here */}
							<Image
								src={project.image}
								alt={project.name}
								width={960}
								height={540}
								className="object-cover my-10 border-2 border-gray-700 aspect-video rounded-xl"
							/>
						</div>
					</div>

					{/* Content here */}
					<div className="text-lg text-white ">
						<PortableText value={project.content} />
					</div>
				</div>
			</Suspense>


		</div>

	);
}