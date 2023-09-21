import { json } from '@sveltejs/kit';
import { getProductsForSearch } from 'lib/products';
import { downLoadFile } from 'lib/storage';

export async function GET({ url, request, setHeaders }) {
	try {
		const searchTerm = url.searchParams.get('search') || '';
        const skip = parseInt(url.searchParams.get('skip')) || 0;

        if (skip === 0) return json({ fail: true, error: "Skip less than or equal 0 or no skip" });

		let products_data = await getProductsForSearch(searchTerm, skip);

		products_data = products_data.filter((product) => {
			if (product && product.image && product.image !== null) return product;
		});

		const products = await Promise.all(
			products_data.map(async (product) => {
				const image = await downLoadFile(product.image);
				product.image = image;
				return product;
			})
		);

        return json({ data: products, fail: false });
	} catch (error) {
		console.log(error);
        return json({ data: [], error: error.message, fail: true });
	}
}
