import { getUser } from "lib/auth";
import { IS_LOGGED_COOKIE_NAME } from "$env/static/private";

export async function load({ cookies, request }) {
    
    const isChecked = await cookies.get(IS_LOGGED_COOKIE_NAME);
    
    if (isChecked) {
        return JSON.parse(isChecked);
    }

    const user = await getUser(request, cookies);

    await cookies.set(IS_LOGGED_COOKIE_NAME, JSON.stringify({
        isLogged: user ? true : false,
        isAdmin: user && user.role === "ADMIN",
    }), {
        path: "/",
        maxAge: 60 * 60,
    });

    if (!user) {
        return {
            isLogged: false,
            isAdmin: false
        }
    }

    return {
        isLogged: true,
        isAdmin: user.role === "ADMIN",
    }
}
