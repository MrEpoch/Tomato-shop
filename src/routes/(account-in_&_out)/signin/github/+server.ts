import { dev } from '$app/environment';
import { githubAuth } from 'lib/lucia';

export const GET = async ({ locals, cookies }) => {
	const [url, state] = await githubAuth.getAuthorizationUrl();

	cookies.set('github_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60 * 1
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
};
