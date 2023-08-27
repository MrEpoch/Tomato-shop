import { CART_MAIN_INFO } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { makeOrder } from "lib/order";

export async function load({ cookies }) {
    const cart = cookies.get(CART_MAIN_INFO);
    if (!cart) throw redirect(302, '/catalogs');
    const cart_data = JSON.parse(cart);
    if (!cart_data.total_quantity || !(cart_data.total_quantity > 0)) {
        throw redirect(302, '/catalog');
    }
}

export const actions = {
    order: async ({ request, cookies }) => {
        const data = await request.formData();
        const email = data.get('email');
        const phone = data.get('phone');
        const name = data.get('full_name');
        const address = data.get('address');
        const country = data.get('country');
        const city = data.get('city');
        const postalcode = data.get('postal_code');
        const cart = data.get('cart');

        try {
            const order = await makeOrder(request, cookies, JSON.parse(cart), email, phone, address, country, city, postalcode);
            if (!order) {
                return fail(400, { message: 'Order failed', failed: true });
            }

            return {
                url: order,
                failed: false,
                success: true
            };
        } catch (e) {
            console.log(e);
            return fail(400, { message: 'Order failed', failed: true });
        }
    
    }
}
