import { json } from "@sveltejs/kit";
import { getProductsForSearch } from "lib/products";

export async function GET({ url, request, setHeaders }) {
    try {
        const searchTerm = url.searchParams.get("search") || "";

        setHeaders({
            "cache-control": "max-age=60",
        });

        const products_data = await getProductsForSearch(searchTerm);

        return json({ data: products_data });
    } catch (error) {
        console.log(error);
        return json({ data: [], error: error.message });
    }
}
