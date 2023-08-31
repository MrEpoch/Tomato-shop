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
    } else if (!session.user.email_verified) {
        throw redirect(303, `/email/verify`);
    } else if (session.user.role !== "ADMIN") {
        throw redirect(303, `/account`);
    }

    return {
        user: session.user
    }
}
