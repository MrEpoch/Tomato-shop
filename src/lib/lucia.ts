import { lucia } from 'lucia';
import { prisma as client } from './db';
import { prisma } from "@lucia-auth/adapter-prisma";
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { github } from "@lucia-auth/oauth/providers";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = lucia({
    adapter: prisma(client),
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            githubUsername: data.githubUsername,
            email: data.email,
            emailVerified: data.email_verified,
            fullName: data.fullName,
            role: data.role
        }
    }
    
})

export const githubAuth = github(auth, {
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET
});
