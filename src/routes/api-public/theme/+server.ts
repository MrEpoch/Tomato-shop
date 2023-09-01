import { json } from "@sveltejs/kit";

export async function GET({cookies, url}) {
    try {
        const value = url.searchParams.get('theme');
        const cookie_updated = cookies.set('theme', value.toString(), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 3
        });

        return json({ cookie_updated });
    } catch (error) {
        console.log(error);
        return json({ error });
    }
}
