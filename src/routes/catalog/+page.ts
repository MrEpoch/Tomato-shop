import { products } from "lib/local_storage";
import { get } from "svelte/store";

export async function load({ fetch }) {
    const products_local = get(products);
    if (products_local.items.length === 0) {
        const products_data = await fetch("/catalog/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ skip: 0 })
        });
        const products_json = await products_data.json();

        
        
        products.update(value => {
            return {
                ...value,
                items: [...value.items, ...products_json.products]
            }
        })
    }

    return {
        products_local: get(products),
    }
}
