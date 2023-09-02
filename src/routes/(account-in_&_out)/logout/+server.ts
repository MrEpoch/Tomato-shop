import { json } from '@sveltejs/kit';
import { auth } from 'lib/lucia';

export async function GET({ locals }) {
    const session = await locals.auth.validate();
    if (!session) {
        return json({ error: 'Unauthorized' }); 
    }

    await auth.invalidateSession(session.sessionId)
    locals.auth.setSession(null);
}
