import { products } from "lib/local_storage";
import { get } from "svelte/store";

export async function load({ fetch }) {
    const products_local = get(products);
    if (products_local.items.length === 0) {
        const products_data = await fetch(`/admin/api-product/${products_local.items.length}`);
        const products_json = await products_data.json();
        products.update(value => {
            return {
                ...value,
                items: [...value.items, ...products_json.data]
            }
        })
    }

    return {
        products_local: get(products),
    }
}
