import { getProjects } from "@/sanity/schemas/sanityutils";

export default async function Home() {

const projects = await getProjects();

  return (
    <div>my projects go here</div>
  );
}
