import { comparePasswords } from "lib/auth";
import { getUserByEmail } from "lib/user";
import { REFRESH_TOKEN_COOKIE_NAME } from "$env/static/private";
import { CreateRefreshToken } from "lib";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        try {
            const user = await getUserByEmail(email);
            const isPasswordValid = await comparePasswords(password, user.password);
            if (user === null) {
                throw new Error('User not found');
            }
            if (!isPasswordValid) {
                throw new Error('Password is invalid');
            }

            const refresh_token = await CreateRefreshToken(user.id, user.email); 

            cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            return {
                status: 200,
                body: {
                    message: 'Logged in successfully',
                },
            };
        } catch (error) {
            return {
                status: 401,
                body: {
                    message: error.message,
                },
            };
        }
    }
}
