import { writable, derived } from 'svelte/store';

export const term = writable('');
export const items = writable([]);
export const filtered = derived([term, items], ([$term, $items]) =>
	$items.filter((x) => x.name.includes($term))
);

export const globalError = writable('');
