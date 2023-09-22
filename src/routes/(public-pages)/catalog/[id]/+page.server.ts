import { redirect } from "@sveltejs/kit";
import { getProduct } from "lib/products";
import { downLoadFile } from "lib/storage";

export const load = async ({ params }) => {
    const id = params.id;

    const product = await getProduct(id);
    if (!product) throw redirect(303, "/catalog");
    const image = await downLoadFile(product.image);
    product.image = image;

    return {
        product_catalog: product
    };
}
