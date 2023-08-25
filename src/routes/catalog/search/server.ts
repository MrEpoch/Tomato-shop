import { json } from "@sveltejs/kit";
import { getProductsForSearch } from "lib/products";

export async function POST({ url, request }) {
    try {
        const { products, searchTerm } = await request.json();
        let products_data: any[];

        if (!searchTerm || searchTerm === '') {
            products_data = products;
        } else {
            products_data = await getProductsForSearch(searchTerm);
        }

        return json({ data: products_data });
    } catch (error) {
        console.log(error);
        return json({ data: [], error: error.message });
    }
}
