import { json } from "@sveltejs/kit";

export async function GET({cookies, url}) {
    try {
        const value = url.searchParams.get('theme');
        const cookie_updated = cookies.set('theme', value, {
            httpOnly: false,
            path: '/',
        });

        return json({ cookie_updated });
    } catch (error) {
        console.log(error);
        return json({ error });
    }
}
