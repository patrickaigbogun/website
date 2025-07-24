import { getServerEnv } from '@/lib/env/helpers';

export const sanityMutateToken = getServerEnv('MUTATE_TOKEN');
