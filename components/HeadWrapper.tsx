
'use client';

import { getPages } from "@/sanity/sanity-utils";
import Header from "./header";
import { useState } from "react";
import LoadingUI from "./loadingui";
import { useEffect } from "react";

export default  function HeaderWrapper() {
	const [pages, setpages] =  useState<any>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(()=>{

		const fetchpages = async () => {
			try {
				const fetchedpages = await getPages();
				setpages(fetchedpages);
			} catch (error) {
				console.error('error fetching pages;', error);
				setError('error loading pages');
			}
		};
		
		fetchpages();

	},[]

	);

	if (error) {
		return(
			<div>
				<h2>error loading pages, this could be the issue;</h2>
				{error}
			</div>
		);
	}
	if (!pages) {
		return(
			<LoadingUI/>
		);
	}

	return <Header pages={pages} />;
}
