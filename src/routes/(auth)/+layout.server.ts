import { redirect } from '@sveltejs/kit';

export async function load({
    locals,
    url
}: {
    locals: any,
	url: URL;
}) {
    const session = await locals.auth.validate();

	if (!session) {
		throw redirect(303, `/signin?redirectTo=${url.pathname}`);
    } else if (!session.user.emailVerified && typeof session.user.emailVerified === "boolean") {
        throw redirect(303, `/email/verify`);
    }

    return {
        user: session.user
    }
}
