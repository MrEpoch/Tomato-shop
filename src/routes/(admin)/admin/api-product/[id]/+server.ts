import { REFRESH_TOKEN_COOKIE_NAME } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { getProducts } from "lib/products";

export async function GET({ cookies, params }) {
    try {
        const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
        if (!refreshToken) {
            return json({ data: "No refresh token" }, { status: 400 });
        }

        const skip = await params.id;

        const data = await getProducts(50, parseInt(skip));
        return json({ data }, { status: 201 });
    } catch (err) {
        console.log(err);
        return json({ data: "Error" }, { status: 500 });
    }
}
