import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "next-sanity";

type Prop = {
    params: {slug: string}
}

export default async function Page({params}: Prop) {
    const page = await getPage(params.slug);

    return(
        <div>
            <h1 className="bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text text-transparent text-5xl drop-shadow font-extrabold" >{page?.title}</h1>
        
       <div className="prose prose-a:underline prose-a:text-white hover:prose-a:text-gray-400 transition text-lg text-white mt-10" >
       <PortableText value={page.content}/>
       </div>
        </div>
    )
}