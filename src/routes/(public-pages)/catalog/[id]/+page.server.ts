import { redirect } from '@sveltejs/kit';
import { getProduct } from 'lib/products';
import { downLoadFile } from 'lib/storage';
import { CART_MAIN_INFO } from '$env/static/private';
import { getProductCount } from 'lib/products';

export const load = async ({ params }) => {
	const id = params.id;

	const product = await getProduct(id);
	if (!product) throw redirect(303, '/catalog');
	const image = await downLoadFile(product.image);
	product.image = image;

	return {
		product_catalog: product
	};
};

export const actions = {
	cartcookie: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const cart = JSON.parse(data.get('cart'));

			cookies.set(
				CART_MAIN_INFO,
				JSON.stringify({
					total_quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
					total_price: cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
					items: cart.map((item) => ({
						id: item.id,
						quantity: item.quantity,
						price: item.price
					}))
				}),
				{
					path: '/',
					httpOnly: false,
					maxAge: 60 * 60 * 24 * 30
				}
			);

			const product_count = await getProductCount();

			return {
				product_count
			};
		} catch (e) {
			console.log(e);
		}
	}
};
