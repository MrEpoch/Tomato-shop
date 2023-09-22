import { fail, redirect } from '@sveltejs/kit';
import { CreateProduct, deleteProduct, getProduct, updateProduct } from 'lib/products';
import { writeFile, unlink } from 'fs/promises';
import { storeFile } from 'lib/storage';

export const actions = {
	create: async ({ request }) => {
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

	
	delete: async ({ request }) => {
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
