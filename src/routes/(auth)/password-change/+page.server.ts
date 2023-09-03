import { fail, redirect } from '@sveltejs/kit';
import { auth } from 'lib/lucia';
import { z } from 'zod';

export const load = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) {
        throw redirect(303, `/account`);
    }
}

export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        if (!data.has('password')) return fail(400);
        if (!data.has('newPassword')) return fail(400);
        if (data.get('newPassword') === data.get('password')) return fail(400);
        
        const passwordZod = z.string().min(8);
        const passwordError = passwordZod.safeParse(data.get("newPassword"));

        if (!passwordError.success) {
            return fail(400, {
                data: data.get("newPassword"),
                error: "Invalid password"
            })
        }

        try {
            await auth.invalidateAllUserSessions(locals.auth.session);
            await auth.updateUserAttributes(locals.auth.session.userId, {
                password: data.get('newPassword')
            });
        } catch (e) {
            throw redirect(302, "/account");
        }

        throw redirect(303, `/account`);
	}
};
