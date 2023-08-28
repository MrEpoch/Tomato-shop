import { redirect } from '@sveltejs/kit';
import { getUser } from 'lib/auth';
import { updateUserFullNameOrEmail } from 'lib/user';

export async function load({ cookies, request }) {
	const user = await getUser(request, cookies);

	return {
		user: user
	};
}

export const actions = {
	fullName: async ({ cookies, request }) => {
		try {
			const user = await getUser(request, cookies);
			const formData = await request.formData();

			await updateUserFullNameOrEmail(user.id, formData.get('fullName'), user.email);

			redirect(303, `/`);
		} catch (error) {
			console.log(error);
			return {
				status: 401,
				body: {
					message: error.message
				}
			};
		}
	},
	email: async ({ cookies, request }) => {
		try {
			const user = await getUser(request, cookies);
			const formData = await request.formData();

			await updateUserFullNameOrEmail(user.id, user.fullName, formData.get('email'));

			redirect(303, `/`);
		} catch (error) {
			console.log(error);
		}
	}
};
