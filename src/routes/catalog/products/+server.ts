import { json } from "@sveltejs/kit";
import { getProducts } from "lib/products";
import { downLoadFile } from "lib/storage";

export async function POST({ cookies, request }) {
    try {
        const { skip } = await request.json();

        const products = await getProducts(50, parseInt(skip));

        const products_withImage = await Promise.all(products.map(async (product) => {
            const image = await downLoadFile(product.image);
            product.image = image;
            return product;
        }));

        return json({ products_withImage }, { status: 201 });
    } catch (err) {
        console.log(err);
        return json({ data: "Error" }, { status: 500 });
    }
}
