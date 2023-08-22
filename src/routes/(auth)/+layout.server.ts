import { redirect } from "@sveltejs/kit";
import type { Cookies } from "@sveltejs/kit";
import { isLogged } from "lib/auth";

export function load({ cookies, url, request }: { cookies: Cookies, url: URL, request: Request }) {
    if (!isLogged(request, cookies)) {
        throw redirect(303, `/signin?redirectTo=${url.pathname}`);
    }
}

