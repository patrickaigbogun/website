// sanitytester\app\(site)\projects\[project]\page.tsx

import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from 'next/link';

type Props = {
    params: {project: string}
};

export default async function Project({params}: Props){

    const slug = params.project ;

    const project = await getProject(slug) ;

    return(
        <div  >
        
        <header className="flex items-center justify-between gap-2" >
        <Link href="../" title="Home" rel="noopener noreferrer" className="bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition">
            Home
        </Link>
		<Link href={project.url} title="View project" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg text-black font-bold sm:font-medium p-3 whitespace-nowrap hover:bg-gray-800 hover:text-white transition" >
			View Project
		</Link>
        </header>

        <h1 className="my-10 bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent text-5xl font-bold" >
			{project.name}
		</h1>


        {/* image here */}

        <Image
        src={project.image}
        alt={project.name}
        width={480}
        height={270}
        className="aspect-video my-10 border-2 border-gray-700 object-cover rounded-xl"
        />

        {/* content here */}
         <div className="prose text-lg text-white mt-5" >
                <PortableText value={project.content}/>
            </div>

        
        </div>
    )
}