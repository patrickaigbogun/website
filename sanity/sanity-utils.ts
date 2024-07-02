import { Project } from "@/types/Projects";
import { createClient, groq } from "next-sanity";

export async function getProjects(): Promise<Project[]> {
	const client = createClient({
		projectId: "d8emt0pr",

		dataset: "production",

		apiVersion: "2024-06-30",
	});

	return client.fetch(
		groq`*[_type == 'project']{

            _id,
            _createdAt,
            name,
            'slug': slug.current,
            'image': image.asset->url,
            url,
            content,
        }`
	);
}
