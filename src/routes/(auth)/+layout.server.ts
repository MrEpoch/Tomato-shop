import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { isLogged } from 'lib/auth';

export async function load({
	cookies,
	url,
	request
}: {
	cookies: Cookies;
	url: URL;
	request: Request;
}) {
	const isLogged_res = await isLogged(request, cookies);
	if (!isLogged_res || !isLogged_res.user) {
		throw redirect(303, `/signin?redirectTo=${url.pathname}`);
	}
}
