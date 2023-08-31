// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
        interface Locals {
            validate: import ("@lucia-auth/sveltekit").Validate
            validateUser: import ("@lucia-auth/sveltekit").ValidateUser
            setSession: import ("@lucia-auth/sveltekit").SetSession
            auth: import ("lucia-auth").AuthRequest
        }
		// interface PageData {}
		// interface Platform {}
        const __prisma: PrismaClient

        declare namespace Lucia {
            type Auth = import ("$lib/lucia").Auth
            type DatabaseUserAttributes = {
                email: string,
                email_verified: boolean,
                fullName: string,
                role: string
            };
            type DatabaseUserAttributes = {};
        }
	}
}

export {};
