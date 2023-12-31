import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from 'lib/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(308, '/account');
	}
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		const fullName = data.get('fullName');
		const password = data.get('password');
		const passwordZod = z.string().min(8);
		const fullNameZod = z.string().min(3);

		const passwordError = passwordZod.safeParse(password);
		const fullNameError = fullNameZod.safeParse(fullName);

		if (!passwordError.success) {
			return fail(400, {
				password,
				fail: true,
				error: 'Invalid password'
			});
		} else if (!fullNameError.success) {
			return fail(400, {
				fullName,
				fail: true,
				error: 'Invalid full name'
			});
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: fullNameError.data.toString() as string,
					password: passwordError.data.toString() as string
				},
				attributes: {
					fullName: fullNameError.data.toString(),
					IsPassword: true
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (error) {
			console.log(error);
			return fail(500, {
				fail: true,
				error: 'Could not login user'
			});
		}

		const redirectIs = url.searchParams.get('redirectTo');
		if (redirectIs) {
			throw redirect(308, redirectIs);
		}

		throw redirect(303, '/account');
	}
};
