import isEmpty from 'validator/lib/isEmpty';
import { prisma } from './db';

export const getProduct = async (id: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });
        return product;
    } catch (err) {
        console.log(err);
        return;
    }
};

export const getProducts = async (take: number, skip: number) => {
    try {
        const products = await prisma.product.findMany({
            take,
            skip
        });
        return products;
    } catch (err) {
        console.log(err);
        return;
    }
};


export const CreateProduct = async (
	name: string,
	description: string,
	long_description: string,
	price: string,
	stripeProductId: string,
	imageName: string
) => {
	try {
		verifyItemString(name);
		verifyItemString(description);
		verifyItemString(long_description);
		verifyItemString(stripeProductId);
		verifyItemString(imageName);
	} catch (err) {
        console.log(err);
		throw new Error(err);
	}

	try {
        const new_price: number = parseFloat(parseFloat(price).toFixed(2));
		const product = await prisma.product.create({
			data: {
				name,
				description,
				long_description,
				price: new_price,
				stripeProductId,
				image: imageName
			}
		});
		return product;
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};

export const deleteProduct = async (id: string) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id
            }
        });
        return product;
    } catch (err) {
        console.log(err);
        return;
    }
};

export const verifyItemString = (item: string) => {
	switch (true) {
		case item.length < 3:
			throw new Error('Item must be at least 3 characters long');
		case isEmpty(item):
			throw new Error('Item cannot be empty');
		case item === undefined:
			throw new Error('Item cannot be undefined');
		default:
			return true;
	}
};