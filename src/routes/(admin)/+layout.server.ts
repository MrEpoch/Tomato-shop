import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { isAdmin } from "lib/auth";

export function load({ cookies, request }: { cookies: Cookies, url: URL, request: Request }) {
    if (!isAdmin(request, cookies)) {
        throw redirect(303, `/signup`);
    }
}
