import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import { prisma } from './db';
import { cacheResponse, getCachedEmailToken, getCachedProductResponse } from './cache';
import { generateRandomString } from "lucia/utils";

export const CreateRefreshToken = async (userId: string) => {
	try {
		const refreshToken = await jwt.sign(
			{
				id: userId
			},
			REFRESH_TOKEN_SECRET,
			{
				expiresIn: '7d'
			}
		);

		await prisma.refresh_token.create({
			data: {
				token: refreshToken,
				userId: userId,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			}
		});

		return refreshToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const DeleteRefreshToken = async (refreshToken: string) => {
	try {
		const token = await prisma.refresh_token.findUnique({
			where: {
				token: refreshToken
			}
		});
		if (!token) return null;

		const deletedRefreshToken = await prisma.refresh_token.delete({
			where: {
				token: refreshToken
			}
		});
		return deletedRefreshToken;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const verifyRefreshToken = async (refreshToken: string) => {
	try {
		const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
		return decoded;
	} catch (error) {
		await DeleteRefreshToken(refreshToken);
		return null;
	}
};

export const generateEmailVerificationToken = async (userId: string) => {
    try {
        const storedEmailToken = await getCachedEmailToken(`email-verify-token:${userId}`);

        if (storedEmailToken) {
            return storedEmailToken;
        }

        const token = generateRandomString(63);

        await cacheResponse("email-verify-token", JSON.stringify(userId), token, 3 * 60 * 60);

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
