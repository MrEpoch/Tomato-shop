import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from 'lib/lucia';
import { wait } from 'lib';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		throw redirect(302, '/account');
	}
};

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const usernameZod = z.string().min(3);
		const passwordZod = z.string().min(8);

		const usernameError = usernameZod.safeParse(username);
		const passwordError = passwordZod.safeParse(password);

		if (!usernameError.success) {
			return fail(400, {
				username,
                fail: true,
				error: 'Invalid Username'
			});
		} else if (!passwordError.success) {
			return fail(400, {
                password,
                fail: true,
				error: 'Invalid password'
			});
		}

		let load_speed = 0;
		const slower = cookies.get('slower');
		if (slower) {
			load_speed = JSON.parse(slower);
		}
		cookies.set('slower', JSON.stringify(load_speed + 1), {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 12
		});

		try {
			await wait(load_speed * 1000);
			const key = await auth.useKey(
				'username',
				usernameError.data.toLowerCase(),
				passwordError.data
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (error) {
			console.log(error);
			return fail(400, {
                fail: true,
				error: 'Could not login user'
			});
		}

		throw redirect(302, '/account');
	}
};
