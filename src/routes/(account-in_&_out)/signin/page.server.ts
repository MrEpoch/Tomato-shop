export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		try {
			const user = await getUserByEmail(email);
			if (user === null) {
				throw new Error('User not found');
			}
			const isPasswordValid = await comparePasswords(password, user.password);

			if (!isPasswordValid) {
				throw new Error('Password is invalid');
			}

			const refresh_token = await CreateRefreshToken(user.id);

			await cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60 * 24 * 7
			});
			await cookies.delete(IS_LOGGED_COOKIE_NAME);
			redirect(300, '/account');
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
