import { lucia } from 'lucia';
import { prisma as client } from './db';
import { prisma } from "@lucia-auth/adapter-prisma";
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';

export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.fullName,
            role: data.role
        }
    }
    
})

