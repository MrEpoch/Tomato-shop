import { createUser } from "lib/user";
import { REFRESH_TOKEN_COOKIE_NAME } from "$env/static/private";
import { CreateRefreshToken } from "lib";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const fullName = data.get('fullName');
        const email = data.get('email');
        const password = data.get('password');
        try {
            const user = await createUser(fullName, email, password);

            const refresh_token = await CreateRefreshToken(user.id, user.email); 

            cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            
            throw redirect(300, '/account');
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
