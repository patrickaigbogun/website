import { LinkButton } from "@/components/LinkButton";
import LoadingUI from "@/components/loadingui";
import { NavBtn } from "@/components/NavBtn";
import { montserrat } from "@/fonts/fonts";
import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
  params: Promise<{ project: string }>;
};

export default async function Project({ params }: Props) {
  const project = await getProject((await params).project);

  return (
    <div className="mb-10">
      <header className="flex items-center justify-between gap-2 p-4 mx-auto my-2 max-w-screen-2xl">
        <NavBtn direction="back">Go Back</NavBtn>
        <LinkButton target={project.url} title="View project">
          View Project
        </LinkButton>
      </header>

      <Suspense fallback={<LoadingUI />}>
        <div className="flex flex-col gap-10 px-4 mx-auto max-w-screen-2xl">
          <h1
            className={`text-white text-3xl sm:text-5xl font-bold text-start sm:text-center ${montserrat.className}`}
          >
            {project.name}
          </h1>

          <div className="flex items-center justify-center w-full">
            <Image
              src={project.image}
              alt={project.name}
              width={1920}
              height={1080}
              className="object-cover max-w-full border-2 border-gray-700 rounded-xl"
            />
          </div>

          <div className="w-full max-w-full prose prose-lg text-justify text-white justify-evenly prose-headings:text-white prose-strong:text-white prose-a:text-green-500">
            <PortableText value={project.content} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
