export async function load({ cookies, locals, url }) {
    const session = await locals.auth.validate();

	return {
		session,
        url: url.pathname,
	};
}
