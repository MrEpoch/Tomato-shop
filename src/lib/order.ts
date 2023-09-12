import { STRIPE_SECRET_KEY } from '$env/static/private';
import { prisma } from './db';
import Stripe from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16'
});

async function mapOverOrders(orders: any) {
	const ordersWithProducts = await Promise.all(
		orders.map(async (order: any) => {
			const product = await prisma.product.findUnique({
				where: {
					id: order.id
				}
			});
			return product;
		})
	);
	return ordersWithProducts;
}

export const makeOrder = async (
	locals: any,
	order: any,
	email: string,
	phone: string,
	address: string,
	country: string,
	city: string,
	postalcode: string,
	name: string
) => {
	try {
		const products = await mapOverOrders(order);
		const orders = order.map((item: any) => {
			const product = products.find((product: any) => product.id === item.id);
			if (!product) {
				return;
			}
			return {
				price: product.stripeProductId,
				quantity: item.quantity
			};
		});

		const session = await stripe.checkout.sessions.create(
			{
				line_items: orders,
				mode: 'payment',
				success_url: 'https://www.tomatodream.store/payment/success',
				cancel_url: 'https://www.tomatodream.store/payment/cancel'
			},
			{
				apiKey: STRIPE_SECRET_KEY
			}
		);

		const order_db = await prisma.order.create({
			data: {
				address,
				country,
				email,
				city,
				postalCode: postalcode,
				phone,
				FullName: name,
				orderItems: {
					create: products.map((item: any) => {
						return {
							quantity: order.find((order: any) => order.id === item.id).quantity,
							Product: {
								connect: {
									id: item.id
								}
							}
						};
					})
				}
			}
		});

		const session_auth = await locals.auth.validate();
		if (session_auth) {
			await prisma.order.update({
				where: {
					id: order_db.id
				},
				data: {
					userId: session_auth.user.userId
				}
			});
		}

		return session.url;
	} catch (e) {
		console.log(e);
		return null;
	}
};
