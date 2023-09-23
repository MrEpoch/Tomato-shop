import { redirect } from '@sveltejs/kit';

export async function load({ locals, url }: { locals: any; url: URL }) {
	const session = await locals.auth.validate();
	if (!session) {
		throw redirect(303, `/signin?redirectTo=${url.pathname}`);
    }

    const isError = url.searchParams.get('error');
    if (isError && isError === 'Unauthorized') {
        return {
            user: session.user,
            errorA: isError
        }
    }

	return {
		user: session.user
	};
}
