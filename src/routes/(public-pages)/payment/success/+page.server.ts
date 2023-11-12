import { CART_MAIN_INFO } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { TrueDbOrder } from 'lib/order';

export const load: PageServerLoad = async ({ url, locals, cookies }) => {
	const orderSuccess = url.searchParams.get('order');

	if (!orderSuccess) {
		throw redirect(303, '/payment');
	}

	const order = await TrueDbOrder(orderSuccess, locals);
	if (!order) throw redirect(303, '/payment');
	cookies.delete(CART_MAIN_INFO);
};
