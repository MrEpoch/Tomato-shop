import { LogOut } from "lib/user";
import { IS_LOGGED_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "$env/static/private";
import { json } from "@sveltejs/kit";

export async function POST({ cookies }) {
    const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
    if (!refreshToken) {
        return {
            status: 401,
            body: {
                message: "You are not logged in",
            },
        };
    }
    const data = await LogOut(refreshToken);
    cookies.delete(REFRESH_TOKEN_COOKIE_NAME);
    cookies.delete(IS_LOGGED_COOKIE_NAME);
    return json({ data }, { status: 201 });
}
