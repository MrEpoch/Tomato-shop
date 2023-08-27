import { getCurrentCookieValue } from 'lib/cookies';
import { writable } from 'svelte/store';

export async function load({ fetch, parent, url, setHeaders }) {
    const parentData = await parent();

    const cacheBust = getCurrentCookieValue("product-cache") || parentData.cacheBust;
    const search = url.searchParams.get("search") || "";

    const resp = await fetch(`/admin/api-product/search?search=${search}&cache=${cacheBust}`);
    const products = await resp.json();

    return {
        products_search: writable(products),
    }
    
}
