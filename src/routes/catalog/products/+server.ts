import { json } from "@sveltejs/kit";
import { getProducts } from "lib/products";

export async function POST({ cookies, request }) {
    try {
        const { skip } = await request.json();

        const products = await getProducts(50, parseInt(skip));
        return json({ products }, { status: 201 });
    } catch (err) {
        console.log(err);
        return json({ data: "Error" }, { status: 500 });
    }
}
