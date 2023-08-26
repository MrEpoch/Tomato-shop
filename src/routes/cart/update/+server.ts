import { CART_MAIN_INFO } from "$env/static/private";
import { json } from "@sveltejs/kit";

export async function POST({ cookies, request }) {
    try {
        const { cart } = await request.json(); 
        const updated = await cookies.set(CART_MAIN_INFO, JSON.stringify({
            total_quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
            total_price: cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
            items: cart.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        }), {
            path: '/',
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 30,
        });


        return json({ updated }, { status: 201 });
    } catch (e) {
        console.log(e);
    }
}

