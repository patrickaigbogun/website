

const getEnvironmentVariable = (environmentVariable: string): string => {
	const unvalidatedEnvironmentVariable = process.env[environmentVariable];
	if (!unvalidatedEnvironmentVariable) {
		throw new Error(
			`Couldn't find environment variable: ${environmentVariable}`
		);
	} else {
		return unvalidatedEnvironmentVariable;
	}
};

export const SanityProjectId = {
	apiKey: getEnvironmentVariable("NEXT_PUBLIC_PROJECT_ID")
};

export const SanityDataset = {
	apiKey: getEnvironmentVariable("NEXT_PUBLIC_DATASET")
};

export const SanityMutateToken = {
	apiKey: getEnvironmentVariable("MUTATE_TOKEN")
}
