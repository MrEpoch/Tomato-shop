import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { isAdmin } from "lib/auth";

export async function load({ cookies, request }: { cookies: Cookies, url: URL, request: Request }) {
    try {
        const isAdmin_res = await isAdmin(request, cookies);
        if (!isAdmin_res) throw redirect(303, `/signup`);

        return {
            user: isAdmin_res,
        };
    } catch (err) {
        console.log(err);
        throw redirect(303, `/signup`);
    }
}
