import { lucia } from 'lucia';
import { prisma as client } from './db';
import { prisma } from '@lucia-auth/adapter-prisma';
import { ioredis } from '@lucia-auth/adapter-session-redis';
import redisClient from './redis';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { github } from '@lucia-auth/oauth/providers';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = lucia({
	adapter: {
		user: prisma(client),
		session: ioredis(redisClient)
	},
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			fullName: data.fullName,
			role: data.role,
			IsPassword: data.IsPassword
		};
	}
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});
