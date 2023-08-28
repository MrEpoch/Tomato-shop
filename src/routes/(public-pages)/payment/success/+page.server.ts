import { CART_MAIN_INFO } from '$env/static/private';

export async function load({ cookies }) {
	cookies.delete(CART_MAIN_INFO);
}
