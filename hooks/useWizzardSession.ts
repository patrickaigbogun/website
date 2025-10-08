'use client';

import { useCallback, useEffect, useState } from 'react';

export function useWizardSession<T extends Record<string, any>>(
	wizardId: string,
	initialData: T
) {
	const STORAGE_KEY = `__wizard_session__${wizardId}`;
	const [data, setData] = useState<T>(initialData);
	const [step, setStep] = useState<number>(0);

	// Load persisted data
	useEffect(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			try {
				const parsed = JSON.parse(raw);
				setData(prev => ({ ...prev, ...parsed }));
			} catch {
				// ignore malformed JSON
			}
		}
	}, [STORAGE_KEY]);

	// Persist on change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}, [data, STORAGE_KEY]);

	const update = useCallback((partial: Partial<T>) => {
		setData(prev => ({ ...prev, ...partial }));
	}, []);

	const reset = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY);
		setData(initialData);
		setStep(0);
	}, [STORAGE_KEY, initialData]);

	const nextStep = useCallback(() => setStep(s => s + 1), []);
	const prevStep = useCallback(() => setStep(s => Math.max(0, s - 1)), []);

	return { data, update, reset, step, setStep, nextStep, prevStep };
}
