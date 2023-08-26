import { redirect } from "@sveltejs/kit";
import { cart } from "lib/local_storage";
import { get } from "svelte/store";

export async function load() {
    try {
        if (!(get(cart).items.length > 0)) {
            throw redirect(300, "/catalog");
        }
        return;
    } catch (e) {
        console.error(e);
    }
}
