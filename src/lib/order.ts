import { dev } from '$app/environment';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { cacheResponse, getCached } from './cache';
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
	order: any,
	email: string,
	phone: string,
	address: string,
	country: string,
	city: string,
	postalcode: string,
	name: string,
	orderId: string
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
				success_url: !dev ? `https://tomatodream.store/payment/success?order=${orderId}` : `http://localhost:5173/payment/success?order=${orderId}`,
        cancel_url: !dev ? 'https://tomatodream.store/payment/cancel' : 'http://localhost:5173/payment/cancel',
			},
			{
				apiKey: STRIPE_SECRET_KEY
			}
		);

		await cacheResponse(
            `order`,
            JSON.stringify({
				address,
				country,
				email,
				city,
				postalCode: postalcode,
				phone,
				FullName: name,
				order,
				products
            }),
            orderId,
			60 * 60 * 12
		);

		return {
			url: session.url
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const TrueDbOrder = async (orderId: string, locals: any) => {
    try {
        const orderCached = await getCached(`order:${orderId}`);

        if (!orderCached) {
            return null;
        }

        const order_db = await prisma.order.create({
            data: {
                address: orderCached.address,
                country: orderCached.country,
                email: orderCached.email,
                city: orderCached.city,
                postalCode: orderCached.postalCode,
                phone: orderCached.phone,
                FullName: orderCached.FullName,
                orderItems: {
                    create: orderCached.products.map((item: any) => {
                        return {
                            quantity: orderCached.order.find((order: any) => order.id === item.id).quantity,
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

        return order_db;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const deleteOrder = async (orderId: string) => {
	try {
		await prisma.orderItem.deleteMany({
			where: {
				orderId: orderId
			}
		});

		await prisma.order.delete({
			where: {
				id: orderId
			}
		});

		return true;
	} catch (e) {
		console.log(e);
		return null;
	}
};
