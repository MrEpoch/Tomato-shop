import { CART_MAIN_INFO } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import { makeOrder } from 'lib/order';

export async function load({ cookies, url }) {
	const errorHappened = url.searchParams.get('error');
	const cart = cookies.get(CART_MAIN_INFO);
	if (!cart) throw redirect(302, '/catalog');
	const cart_data = JSON.parse(cart);
	if (!cart_data.total_quantity || !(cart_data.total_quantity > 0)) {
		throw redirect(302, '/catalog');
	}

	if (errorHappened) {
		return {
			errorC: `Payment Not Found, In case of mistake
            please contact us`
		};
	}
}

export const actions = {
	order: async ({ request, locals, url }) => {
		const data = await request.formData();
		const email = data.get('email');
		const phone = data.get('phone');
		const name = data.get('full_name');
		const address = data.get('address');
		const country = data.get('country');
		const city = data.get('city');
		const postalcode = data.get('postal_code');
		const cart = data.get('cart');

		const orderId =
			Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		try {
			const order = await makeOrder(
				JSON.parse(cart),
				email,
				phone,
				address,
				country,
				city,
				postalcode,
				name,
				orderId,
				url
			);
			if (!order || !order.url) {
				return fail(400, { message: 'Order failed', failed: true });
			}

			return {
				url: order.url,
				failed: false,
				success: true
			};
		} catch (e) {
			console.log(e);
			return fail(400, { message: 'Order failed', failed: true });
		}
	}
};
