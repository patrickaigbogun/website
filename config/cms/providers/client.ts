import { sanityDataset, sanityProjectId } from '@/config/cms/env/client';

const clientConfig = {
	projectId: sanityProjectId,

	dataset: sanityDataset,

	apiVersion: '2025-07-23',

	useCdn: true,
};

export default clientConfig;
