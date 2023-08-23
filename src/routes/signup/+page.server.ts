import { createUser } from "lib/user";
import { IS_LOGGED_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "$env/static/private";
import { CreateRefreshToken } from "lib";
import { redirect, type Cookies } from "@sveltejs/kit";
import { isLogged } from "lib/auth";

export async function load({ cookies, url, request }: { cookies: Cookies, url: URL, request: Request }) {
    if (await isLogged(request, cookies)) {
        throw redirect(303, `/account`);
    }
}

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const fullName = data.get('fullName');
        const email = data.get('email');
        const password = data.get('password');
        try {
            const user = await createUser(fullName, email, password);

            const refresh_token = await CreateRefreshToken(user.id); 

            await cookies.set(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
            await cookies.delete(IS_LOGGED_COOKIE_NAME);
            
            return redirect(300, '/account');
        } catch (error) {
            console.log(error);
            return {
                status: 401,
                body: {
                    message: error.message,
                },
            };
        }
    }
}
