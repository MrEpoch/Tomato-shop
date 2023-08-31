import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { auth } from "lib/lucia";
import { generateEmailVerificationToken } from "lib/token";
import { SendMail } from "lib/email/email.send";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, "/account")
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const fullName = data.get('fullName');
        const email = data.get('email');
        const password = data.get('password');
        const emailZod = z.string().email();
        const passwordZod = z.string().min(8);
        const fullNameZod = z.string().min(3);

        const emailError = emailZod.safeParse(email);
        const passwordError = passwordZod.safeParse(password);
        const fullNameError = fullNameZod.safeParse(fullName);

        if (!emailError.success) {
            return fail(400, {
                email,
                error: "Invalid email"
            })
        } else if (!passwordError.success) {
            return fail(400, {
                password,
                error: "Invalid password"
            })
        } else if (!fullNameError.success) {
            return fail(400, {
                fullName,
                error: "Invalid full name"
            })
        }

        console.log(
            emailError.data,
            passwordError.data,
            fullNameError.data
        );

        try {
            const user = await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: emailError.data.toString() as string,
                    password: passwordError.data.toString() as string
                },
                attributes: {
                    fullName: fullNameError.data.toString() as string,
                    email: emailError.data.toString() as string,
                    email_verified: false
                }
            })

            const token = await generateEmailVerificationToken(user.id);

            await SendMail(emailError.data.toString() as string, 'Confirm Email', token, user.fullName);

        } catch (error) {
            console.log(error);
            return fail(500, {
                error: "Could not login user"
            })
        }
        throw redirect(302, "/signin")
    }
}
