import { fail, redirect } from '@sveltejs/kit';
import { CreateProduct, deleteProduct, getProduct, updateProduct } from 'lib/products';
import { writeFile, unlink } from 'fs/promises';
import { storeFile } from 'lib/storage';

export const actions = {
	create: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name');
			const description = data.get('description');
			const long_description = data.get('long_description');
			const price = data.get('price');
			const stripeProductId = data.get('stripePriceId');
			const image = data.get('image');

			if (
				/^\s*$/.test(name) ||
				/^\s*$/.test(description) ||
				/^\s*$/.test(long_description) ||
				/^\s*$/.test(stripeProductId)
			) {
				return fail(400, {
					error: true,
					message: 'You must provide all the fields'
				});
			}

			const newFileName_ext = image.name.split('.').pop();
			if (!['jpg', 'jpeg', 'png', 'webp'].includes(newFileName_ext)) {
				return fail(400, {
					error: true,
					message: 'You must provide a valid image file'
				});
			}

			const newFileName = `${crypto.randomUUID()}.${newFileName_ext}`;

			if (!image.name || image.name === 'undefined') {
				return fail(400, {
					error: true,
					message: 'You must provide a file to upload'
				});
			}

			await storeFile(image, newFileName);

			const product = await CreateProduct(
				name,
				description,
				long_description,
				price,
				stripeProductId,
				newFileName
			);
			if (product === null) {
				return fail(400, {
					error: true,
					message: 'User not found'
				});
			}

			return { success: true, product: product };
		} catch (error) {
			console.log(error);
			return fail(401, {
                message: error.message
			});
		}
	},

	update: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id');
			const image = data.get('image');

			const product = await getProduct(id);
			let newImage = product.image;

			let name = product.name;
			let description = product.description;
			let long_description = product.long_description;
			let price = product.price;
			let stripeProductId = product.stripeProductId;

			if (image) {
				const newFileName_ext = image.name.split('.').pop();
				if (!['jpg', 'jpeg', 'png'].includes(newFileName_ext)) {
					return fail(400, {
						error: true,
						message: 'You must provide a valid image file'
					});
				}
				const newFileName = `${crypto.randomUUID()}.${newFileName_ext}`;

				if (!image.name || image.name === 'undefined') {
					return fail(400, {
						error: true,
						message: 'You must provide a file to upload'
					});
				}
				await writeFile(`src/images/${newFileName}`, new Uint8Array(await image.arrayBuffer()));
				newImage = 'src/images/' + newFileName;
			}
			if (data.get('name') !== product.name) name = data.get('name');
			if (data.get('description') !== product.description) description = data.get('description');
			if (data.get('long_description') !== product.long_description)
				long_description = data.get('long_description');
			if (data.get('price') !== product.price) price = data.get('price');
			if (data.get('stripePriceId') !== product.stripeProductId)
				stripeProductId = data.get('stripePriceId');
			await unlink(`${product.image}`);

			const product_update = await updateProduct(
				id,
				name,
				description,
				long_description,
				price.toString(),
				stripeProductId,
				newImage
			);
			return { success: true, product: product_update };
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: true,
				message: error.message
			});
		}
	},

	delete: async ({ cookies, request }) => {
		const data = await request.formData();
		const id = data.get('id');
		try {
			const product = await deleteProduct(id);
			await unlink(`${product.image}`);
			return { status: 200, body: { message: 'Product deleted' }, success: true };
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: true,
				message: error.message
			});
		}
	}
};
