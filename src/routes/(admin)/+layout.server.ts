import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';
import { isLogged } from 'lib/auth';

export async function load({ cookies, request }: { cookies: Cookies; url: URL; request: Request }) {
	try {
		const isAdmin_res = await isLogged(request, cookies);
		if (!isAdmin_res && !isAdmin_res.admin) {
			throw new Error('Not logged');
		}

		return {
			user: isAdmin_res
		};
	} catch (err) {
		console.log(err);
		throw redirect(303, `/signup`);
	}
}
