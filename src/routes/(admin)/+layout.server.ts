import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { isAdmin } from "lib/auth";
import { getProducts } from "lib/products";

export async function load({ cookies, request }: { cookies: Cookies, url: URL, request: Request }) {
    try {
        const isAdmin_res = await isAdmin(request, cookies);
        if (!isAdmin_res) throw redirect(303, `/signup`);
        
        const products = getProducts(10, 0);

        return {
            user: isAdmin_res,
            products: products
        };
    } catch (err) {
        console.log(err);
        throw redirect(303, `/signup`);
    }
}
