import { redirect } from '@sveltejs/kit';
import { getUser } from 'lib/auth';
import { updateUserPassword } from 'lib/user';

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			if (!data.has('password')) throw redirect(303, `/`);
			if (!data.has('newPassword')) throw redirect(303, `/`);
			if (data.get('newPassword') === data.get('password')) throw redirect(303, `/`);
			const user = await getUser(request, cookies);
			if (!user) throw redirect(303, `/signin?redirectTo=${request.url.pathname}`);

			await updateUserPassword(user.id, data.get('password'));

			throw redirect(303, `/`);
		} catch (error) {
			console.log(error);
			return {
				status: 401,
				body: {
					message: error.message
				}
			};
		}
	}
};
