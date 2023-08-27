import { getUser } from "lib/auth";
import { IS_LOGGED_COOKIE_NAME } from "$env/static/private";

export async function load({ cookies, request, isDataRequest }) {
    const initialRequest = !isDataRequest;

    const productCache = initialRequest ? +new Date() : cookies.get('product-cache');

    if (initialRequest) {
        cookies.set('product-cache', productCache, {
            httpOnly: false,
            path: '/',
        });
    }

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
            cacheBust: productCache,
            isLogged: false,
            isAdmin: false
        }
    }

    return {
        isLogged: true,
        cacheBust: productCache,
        isAdmin: user.role === "ADMIN",
    }
}
