import { json } from '@sveltejs/kit';
import { getProductsForSearch } from 'lib/products';
import { downLoadFile } from 'lib/storage';

export async function GET({ url, request, setHeaders }) {
	try {
		const searchTerm = url.searchParams.get('search') || '';

		setHeaders({
			'cache-control': 'max-age=60'
		});

		const products_data = await getProductsForSearch(searchTerm);

		const products = await Promise.all(
			products_data.map(async (product) => {
				const image = await downLoadFile(product.image);
				product.image = image;
				return product;
			})
		);

		return json({ data: products });
	} catch (error) {
		console.log(error);
		return json({ data: [], error: error.message });
	}
}
