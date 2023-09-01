import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { generateEmailVerificationToken, validateEmailVerificationToken } from "lib/token";
import { auth } from "lib/lucia";
import { SendMail } from "lib/email/email.send";

export const load: PageServerLoad = async ({ locals, params, url }) => {
    const token = url.searchParams.get('email_token');
    const session = await locals.auth.validate();

    if (!session) {
        throw redirect(302, "/signin");
    }

    if (token && session) {
        try {
            console.log(session.user.userId);
            console.log(token, session.user.userId);
            const valid = await validateEmailVerificationToken(token, session.user.userId);
            if (!valid) throw new Error("Invalid token");
            await auth.invalidateAllUserSessions(session.user.userId);
            await auth.updateUserAttributes(session.user.userId, {
                email_verified: true
            })
            const new_session = await auth.createSession({
                userId: session.user.userId,
                attributes: {}
            });
            locals.auth.setSession(new_session);
        } catch (e) {
            console.log(e);
            throw redirect(302, "/signup");
        }
        throw redirect(302, "/account");
    }
}

export const actions: Actions = {
    default: async ({ locals, cookies }) => {
        
        const is_repeat = cookies.get("repeat_email");
        console.log(is_repeat);

        if (!is_repeat) {
            cookies.set("repeat_email", JSON.stringify(true), {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 1
            });
        } else {
            return fail(400, {
                error: "You must wait 1 hour before trying again"
            })
        }

        const session = await locals.auth.validate();
        const new_token = await generateEmailVerificationToken(session.user.userId);
        await SendMail(session.user.email, "Confirm Email", new_token, session.user.fullName); 
        throw redirect(302, "/");
    }
}
