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
        <Link href="../" title="Home" rel="noopener noreferrer" className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition">Home</Link>
            <Link href={project.url} title="view project" target="_blank" rel="noopener noreferrer" className="bg-gray-100 rounded-lg text-gray-500 font-bold py-3 px-4 whitespace-nowrap hover:bg-pink-500 hover:text-pink-100 transition" >
                View Project
            </Link>
        </header>

        <h1 className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold" >{project.name}</h1>


        {/* image here */}

        <Image
        src={project.image}
        alt={project.name}
        width={1920}
        height={1080}
        className="aspect-video my-10 border-2 border-gray-700 object-cover rounded-xl"
        />

        {/* content here */}
         <div className="text-lg text-white mt-5" >
                <PortableText value={project.content}/>
            </div>

        
        </div>
    )
}