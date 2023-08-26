import { CART_MAIN_INFO } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    const cart = cookies.get(CART_MAIN_INFO);
    if (!cart) throw redirect(302, '/catalog');
    const cart_data = JSON.parse(cart);
    if (!cart_data.total_quantity || !(cart_data.total_quantity > 0)) {
        throw redirect(302, '/catalog');
    }
}
