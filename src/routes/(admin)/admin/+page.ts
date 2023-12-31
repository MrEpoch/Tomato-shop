import { getCurrentCookieValue } from 'lib/cookies';
import { writable } from 'svelte/store';

export async function load({ fetch, parent, url, setHeaders, depends }) {
	try {
		depends('products:data');

		const parentData = await parent();

		const cacheBust = getCurrentCookieValue('product-cache') || parentData.cacheBust;
		const search = url.searchParams.get('search') || '';
		const skip = url.searchParams.get('skip') || 0;

		if (search.trim().length > 0) {
			const resp = await fetch(
				`/api-public/search?search=${search}&cache=${cacheBust}&skip=${skip}`
			);
			const products = await resp.json();

			return {
				products_search: writable(products)
			};
		}
		return {};
	} catch (e) {
		console.log(e);
	}
}
