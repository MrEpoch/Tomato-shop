import { OAuthRequestError } from "@lucia-auth/oauth";
import { redirect } from "@sveltejs/kit";
import { auth, githubAuth } from "lib/lucia";

export const load = async ({ url, cookies, locals }) => {
    const storedState = cookies.get("github_oauth_state");
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
             
    if (!storedState || !state || storedState !== state || !code) {
        throw new Error("Something is missing"); 
    }

    try {
        const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) return existingUser;
            console.log("user", githubUser);
            const user = await createUser({
                attributes: {
                    fullName: githubUser.login,
                }
            })
            return user;
        }

        const user = await getUser();

        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });

        locals.auth.setSession(session);
 
    } catch (e) {
        if (e instanceof OAuthRequestError) {
            throw redirect(302, "/error");
        }
        
        console.log(e);
        throw redirect(302, "/");
    }

    throw redirect(302, "/account");
}
