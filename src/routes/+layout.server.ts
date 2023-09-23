export async function load({ cookies, locals, url }) {
	const theme_cookie = cookies.get('theme');
	const theme = theme_cookie ? theme_cookie : 'false';
    const session = await locals.auth.validate();

	return {
		session,
        theme,
        url: url.pathname,
	};
}
