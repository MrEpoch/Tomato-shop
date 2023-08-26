import { STRIPE_SECRET_KEY } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import { getUser } from "./auth";
import { prisma } from "./db";
const Stripe = require("stripe");
const stripe = Stripe(STRIPE_SECRET_KEY);

async function mapOverOrders(orders: any) {
    const ordersWithProducts = await Promise.all(
        orders.map(async (order: any) => {
            const product = await prisma.product.findUnique({
                where: {
                    id: order.id,
                },
            });
            return product;
        }),
    );
    return ordersWithProducts;
}


export const makeOrder = async (
    request: Request,
    cookies: Cookies,
    order: any,
    email: string,
    phone: string,
    address: string,
    country: string,
    city: string,
    postalcode: string,
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
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: orders,
            mode: "payment",
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel",
        }, {
            apiKey: STRIPE_SECRET_KEY,
        });

        const order_db = await prisma.order.create({
            data: {
                address,
                country,
                email,
                city,
                postalCode: postalcode,
                phone,
                orderItems: {
                    create: orders.map((item: any) => {
                        return {
                            quantity: item.quantity,
                            product: {
                                connect: {
                                    id: item.id,
                                },
                            },
                        };
                    }),
                }
            },
        });

        const user = await getUser(request, cookies);
        if (user) {
            await prisma.order.update({
                where: {
                    id: order_db.id,
                },
                data: {
                    userId: user.id,
                },
            });
        }

        return session.url;
    } catch (e) {
        console.log(e);
        return null;
    }
}
                
