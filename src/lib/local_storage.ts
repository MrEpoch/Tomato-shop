import { persisted } from 'svelte-local-storage-store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const preferences = persisted('preferences', {
	theme: '',
	pane: '50%'
});

export const cart = persisted('cart', {
	items: [],
	quantity: 0,
	total: 0
});

export const products = persisted('products', {
	items: []
});
