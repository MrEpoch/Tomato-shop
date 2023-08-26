import { CART_MAIN_INFO } from "$env/static/private";

const actions = {
    cartcookie: async ({ cookies, request }) => {
        try {
            const data = await request.formData();
            const cart = data.get('cart');

            cookies.set(CART_MAIN_INFO, JSON.stringify({
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
        } catch (e) {
            console.log(e);
        }
    }
}
