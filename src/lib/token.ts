import { cacheResponse, getCachedEmailToken } from './cache';
import { generateRandomString } from "lucia/utils";

export const generateEmailVerificationToken = async (userId: string) => {
    try {
        const storedEmailToken = await getCachedEmailToken(`email-verify-token:${userId}`);

        if (storedEmailToken) {
            return storedEmailToken;
        }

        const token = generateRandomString(63);

        await cacheResponse("email-verify-token", JSON.stringify(token), userId, 3 * 60 * 60);

        return token;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export const validateEmailVerificationToken = async (token: string, userId) => {
    try {
        const is_token = await getCachedEmailToken(`email-verify-token:${userId}`);
        if (!is_token || token !== is_token) {
            return null;
        }
        return is_token;
    } catch (e) {
        console.log(e);
        return null;
    }
}
