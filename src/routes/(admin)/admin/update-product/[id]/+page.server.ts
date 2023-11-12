import { redirect, type Actions, fail } from '@sveltejs/kit';
import { deleteProduct, getProduct, updateProduct } from 'lib/products';
import { deleteFile, downLoadFile, storeFile } from 'lib/storage';

export const load = async ({ params }) => {
	const id = params.id;

	const product = await getProduct(id);
	if (!product) throw redirect(303, '/admin');
	const image = await downLoadFile(product.image);
	product.image = image;
	return {
		update_product: product
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id');
			const product = await deleteProduct(id);
			await deleteFile(product.image);
			throw redirect(303, '/admin');
		} catch (error) {
			console.log(error);
			return fail(400, {
				error: true,
				message: error.message
			});
		}
	},
	update: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;
			const image = data.get('image');

			const product = await getProduct(id);
			let newImage = product.image;

			let name = product.name;
			let description = product.description;
			let long_description = product.long_description;
			let price = product.price;
			let stripeProductId = product.stripeProductId;

			const newimage = data.get('newimage');

			if (newimage === 'true') {
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
				await deleteFile(product.image);
				await storeFile(image, newFileName);
				newImage = newFileName;
			}
			if (data.get('name') !== product.name) name = data.get('name');
			if (data.get('description') !== product.description) description = data.get('description');
			if (data.get('long_description') !== product.long_description)
				long_description = data.get('long_description');
			if (data.get('price') !== product.price) price = data.get('price');
			if (data.get('stripePriceId') !== product.stripeProductId)
				stripeProductId = data.get('stripePriceId');

			console.log(name);

			const product_update = await updateProduct(
				id as string,
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
	}
};
