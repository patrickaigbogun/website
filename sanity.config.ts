import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";

const config = defineConfig({
	projectId: "d8emt0pr",

	dataset: "production",

	title: "my personal website",

	apiVersion: "2024-06-30",

	basePath: "/admin",

	plugins: [structureTool()],

	schema: { types: schemas },
});

export default config;
