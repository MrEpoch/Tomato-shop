import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { generateEmailVerificationToken, validateEmailVerificationToken } from "lib/token";
import { auth } from "lib/lucia";
import { SendMail } from "lib/email/email.send";

export const load: PageServerLoad = async ({ locals, params, url }) => {
    const token = url.searchParams.get('email_token');
    const session = await locals.auth.validate();

    if (token) {
        try {
            const valid = await validateEmailVerificationToken(token, session.user.id);
            if (!valid) throw new Error("Invalid token");
            await auth.invalidateAllUserSessions(session.user.id);
            await auth.updateUserAttributes(session.user.id, {
                email_verified: true
            })
            const new_session = await auth.createSession({
                userId: session.user.id,
                attributes: {
                    fullName: session.user.fullName,
                    email: session.user.email
                }
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
    default: async ({ locals }) => {
        const session = await locals.auth.validate();
        const new_token = await generateEmailVerificationToken(session.user.id);
        await SendMail(session.user.email, "Confirm Email", new_token, session.user.fullName); 
        throw redirect(302, "/");
    }
}
