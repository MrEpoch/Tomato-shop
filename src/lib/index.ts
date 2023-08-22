import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import { prisma } from './db';

export const CreateRefreshToken = async (userId: string, email: string) => {
    try {
        const refreshToken = await jwt.sign({
            id: userId,
            email: email
        }, REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        const refreshInDatabase = await prisma.refresh_token.create({
            data: {
                token: refreshToken,
                userId: userId
            }
        });

        return refreshInDatabase;
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

export const CreateAccessToken = async (refreshToken: string) => {
    try {
        const accessToken = await jwt.sign({
            refreshToken: refreshToken
        }, ACCESS_TOKEN_SECRET, {
            expiresIn: '5m'
        });

        return accessToken;
    } catch (error) {    
        console.log(error);
        return null;
    }
}

export const verifyAccessToken = async (accessToken: string) => {
    try {
        const decoded = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        return decoded;
    } catch (error) {
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
