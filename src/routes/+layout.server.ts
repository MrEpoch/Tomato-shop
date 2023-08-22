import { getUser } from "lib/auth";

export async function load({ cookies, request }) {
    const user = await getUser(request, cookies);
    
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
