import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }: { locals: any; url: URL }) {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(307, `/signin?redirectTo=${url.pathname}`);
	} else if (session.user.role !== 'ADMIN') {
		throw redirect(308, `/?error=Unauthorized`);
	}

	return {
		user: session.user
	};
}
