import isEmpty from 'validator/lib/isEmpty';
import { prisma } from './db';

export const CreateProduct = async (
	name: string,
	description: string,
	long_description: string,
	price: number,
	stripeProductId: string,
	imageName: string
) => {
	try {
		verifyItemString(name);
		verifyItemString(description);
		verifyItemString(long_description);
		verifyItemString(stripeProductId);
		verifyItemString(imageName);
		if (typeof price !== 'number' || price < 0) {
			throw new Error('Price cannot be negative');
		}
	} catch (err) {
		return err;
	}

	const new_price = parseFloat(price.toFixed(2));

	try {
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
		return err;
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
