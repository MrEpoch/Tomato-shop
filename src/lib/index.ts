import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '$env/static/private';
import { prisma } from './db';

export const CreateRefreshToken = async (userId: string) => {
    try {
        const refreshToken = await jwt.sign({
            id: userId,
        }, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });

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
}

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
}

export const verifyRefreshToken = async (refreshToken: string) => {
    try {
        const decoded = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        return decoded;
    } catch (error) {
        await DeleteRefreshToken(refreshToken);
        return null;
    }
}
