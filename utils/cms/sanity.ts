// lib/cms/sanity.ts
// Client-safe Sanity utilities

import { sanityDataset, sanityProjectId } from '@/config/cms/env/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create a client-safe image URL builder with hardcoded config
// This avoids importing the config that has environment variable dependencies
const builder = imageUrlBuilder({
	projectId: sanityProjectId,
	dataset: sanityDataset,
});

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
