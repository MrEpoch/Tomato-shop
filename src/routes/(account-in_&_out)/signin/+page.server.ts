import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from 'lib/lucia';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) {
        throw redirect(302, "/account")
    }
	
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");
        const emailZod = z.string().email();
        const passwordZod = z.string().min(8);

        const emailError = emailZod.safeParse(email);
        const passwordError = passwordZod.safeParse(password);

        if (!emailError.success) {
            return fail(400, {
                email: email,
                error: "Invalid email"
            })
        } else if (!passwordError.success) {
            return fail(400, {
                password: password,
                error: "Invalid password"
            })
        }

        try {
            const key = await auth.useKey('email', emailError.data.toLowerCase(), passwordError.data);
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            })
            locals.auth.setSession(session);
        } catch (error) {
            console.log(error);
            return fail(400, {
                error: "Could not login user"
            })
        }

        throw redirect(302, "/account")
    }
}

