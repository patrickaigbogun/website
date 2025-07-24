import { sanityDataset, sanityProjectId } from '@/config/cms/env/client';
import schemas from '@/schemas/cms';
import { structureTool } from 'sanity/structure';

const adminConfig = {
	projectId: sanityProjectId,

	dataset: sanityDataset,

	title: 'my personal website',

	apiVersion: '2025-07-23',

	basePath: '/cms',

	plugins: [structureTool()],

	schema: { types: schemas },
};

export { adminConfig };
