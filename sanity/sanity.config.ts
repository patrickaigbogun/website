import { projectId, dataset } from '@/constants/envs';
import schemas from './schemas';
import { structureTool } from 'sanity/structure';

const config = {
	projectId: projectId,

	dataset: dataset,

	title: 'my personal website',

	apiVersion: '2024-06-30',

	basePath: '/admin',

	plugins: [structureTool()],

	schema: { types: schemas },
};

export default config;
