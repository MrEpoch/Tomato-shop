import { getProductCount } from 'lib/products';

export async function load({ cookies, locals, isDataRequest }) {
	const initialRequest = !isDataRequest;

	const productCache = initialRequest ? +new Date() : cookies.get('product-cache');

	const theme_cookie = cookies.get('theme');
	const theme = theme_cookie ? theme_cookie : 'false';
    const session = await locals.auth.validate();

    const productCount_res = await getProductCount();
    const productCount = productCount_res > 50 ? 50 : productCount_res;

	if (initialRequest) {
		cookies.set('product-cache', productCache, {
			httpOnly: false,
			path: '/'
		});

		if (!theme_cookie) {
			cookies.set('theme', 'false', {
				httpOnly: false,
                path: '/',
                expires: new Date(Date.now() + 60 * 60 * 24 * 7)
			});
		}
	}

    return {
        session,
        theme,
        productCount,
		cacheBust: productCache
	};
}
