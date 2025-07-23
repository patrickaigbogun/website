import { getClientEnv, getServerEnv } from '@/lib/env/helpers';

export const sanityProjectId = getClientEnv('NEXT_PUBLIC_PROJECT_ID');

export const sanityDataset = getClientEnv('NEXT_PUBLIC_DATASET');

export const sanityMutateToken = getServerEnv('MUTATE_TOKEN');
