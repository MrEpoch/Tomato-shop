import isEmpty from 'validator/lib/isEmpty';
import { prisma } from './db';
import { cacheProductResponse, cacheResponse, getCachedProductResponse, getCachedProducts, removeFromCachedProducts, setCachedProducts } from './cache';

export const getProduct = async (id: string, name: string) => {
	try {
        const cachedProduct = await getCachedProductResponse(`products:${name}`);
        if (cachedProduct) {
            return cachedProduct;
        }

		const product = await prisma.product.findUnique({
			where: {
				id
			}
        });

        await cacheProductResponse(`products:${product.name}`, product);

		return product;
	} catch (err) {
		console.log(err);
		throw new Error("Unable to get product");
	}
};

export const getProductCount = async () => {
	try {
        
        const cachedProductCount = await getCachedProductResponse(`products:count`);
        if (cachedProductCount) {
            return cachedProductCount;
        }

        const productCount = await prisma.product.count();

        await cacheResponse(`products:count`, productCount, `count`);

		return productCount;
	} catch (err) {
		console.log(err);
		return;
	}
};

export const getProductsForSearch = async (search: string, take = 15) => {
	try {

        const cachedProducts = await getCachedProducts(`products`, search.trim() === "" ? "*" : search, take);

        if (cachedProducts && cachedProducts.length > 0) {
            return cachedProducts;
        }

		const products = await prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: search,
							mode: 'insensitive'
						}
					}
				]
            },
            take
        });

        await setCachedProducts(products, "products");

		return products;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getProducts = async (take: number, skip: number) => {
    try {
        const cachedProducts = await getCachedProducts(`products`, ``, take + skip);
        if (cachedProducts && cachedProducts.length > 0 && skip === 0) {
            return cachedProducts;
        } else if (cachedProducts && skip + take <= cachedProducts.length) {
            return cachedProducts;
        }

		const products = await prisma.product.findMany({
			take,
			skip,
			orderBy: {
				createdAt: 'desc'
			}
		});

        await setCachedProducts(products, `products`);

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
		if (Number.isNaN(Number.parseFloat(price))) {
			return 0;
		}
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

        await cacheProductResponse(`products`, product);
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
        await removeFromCachedProducts(`products:${product.name}`);

		return product;
	} catch (err) {
		console.log(err);
		return;
	}
};

export const updateProduct = async (
	id: string,
	name: string,
	description: string,
	long_description: string,
	price: string,
	stripeProductId: string,
	image: string
) => {
	try {
		verifyItemString(name);
		verifyItemString(description);
		verifyItemString(long_description);
		verifyItemString(price);
		verifyItemString(stripeProductId);
		verifyItemString(image);
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}

	try {
		const new_price: number = parseFloat(parseFloat(price).toFixed(2));
		const product = await prisma.product.update({
			where: {
				id
			},
			data: {
				name,
				description,
				long_description,
				price: new_price,
				stripeProductId,
				image
			}
        });

        await removeFromCachedProducts(`products:${product.name}`);
        await cacheProductResponse(`products:${product.name}`, product);

		return product;
	} catch (err) {
		console.log(err);
		throw new Error(err);
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
