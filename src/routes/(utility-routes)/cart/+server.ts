import { CART_MAIN_INFO } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const cart = cookies.get(CART_MAIN_INFO);
	if (!cart) return json({ cart: [] });
	const cart_data = JSON.parse(cart);
	return json({ cart_data }, { status: 201 });
}
