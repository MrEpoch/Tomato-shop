import { getUser, isLogged } from 'lib/auth';
import { IS_LOGGED_COOKIE_NAME } from '$env/static/private';

export async function load({ cookies, request, isDataRequest }) {
	const initialRequest = !isDataRequest;

	const productCache = initialRequest ? +new Date() : cookies.get('product-cache');

	const user_cookie = cookies.get(IS_LOGGED_COOKIE_NAME);
	const isLogged_val = user_cookie
		? JSON.parse(user_cookie)
		: {
				user: false,
				admin: false
		  };

	const theme_cookie = cookies.get('theme');
	const theme = theme_cookie ? theme_cookie : false;

	if (initialRequest) {
		cookies.set('product-cache', productCache, {
			httpOnly: false,
			path: '/'
		});

		if (!user_cookie) {
			const isLogged_req = await isLogged(request, cookies);

			cookies.set(
				IS_LOGGED_COOKIE_NAME,
				JSON.stringify({
					user: isLogged_req.user,
					admin: isLogged_req.admin
				}),
				{
					httpOnly: false,
					path: '/'
				}
			);
		}

		if (!theme_cookie) {
			cookies.set('theme', false, {
				httpOnly: false,
				path: '/'
			});
		}
	}

	return {
		isLogged: isLogged_val,
		theme,
		cacheBust: productCache
	};
}
