import { REFRESH_TOKEN_COOKIE_NAME } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { verifyRefreshToken } from 'lib';
import { prisma } from './db';

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
    try {
        const passwords = await bcrypt.compare(password, hashedPassword);
        return passwords;
    } catch (error) {    
        console.log(error);
        return false;
    }
};

export const hashPassword = async (password: string) => {
  try {    
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {  
    console.log(error);
    return null;
  }
};

export const isLogged = async (request: Request, cookies: Cookies) => {
    try {
        const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
        if (!refreshToken) {
            return false;
        }

        const decoded = await verifyRefreshToken(refreshToken);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        
        if (!user) {
            return false;
        }

        const refreshInDatabase = await prisma.refresh_token.findUnique({
            where: {
                userId_token: {
                    userId: user.id,
                    token: refreshToken
                }
            }
        });

        if (!refreshInDatabase) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const isAdmin = async (request: Request, cookies: Cookies) => {
    try {
        const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
        if (!refreshToken) {
            return false;
        }

        const decoded = await verifyRefreshToken(refreshToken);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        
        if (!user) {
            return false;
        }
        
        const refreshInDatabase = await prisma.refresh_token.findUnique({
            where: {
                userId_token: {
                    userId: user.id,
                    token: refreshToken
                }
            }
        });

        if (!refreshInDatabase) {
            return false;
        }

        if (user.role === 'ADMIN') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const getUser = async (request: Request, cookies: Cookies) => {
    try {
        const refreshToken = cookies.get(REFRESH_TOKEN_COOKIE_NAME);
        if (!refreshToken) {
            return null;
        }
        
        const decoded = await verifyRefreshToken(refreshToken);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        
        if (!user) {
            return null;
        }

        const refreshInDatabase = await prisma.refresh_token.findUnique({
            where: {
                userId_token: {
                    userId: user.id,
                    token: refreshToken
                }
            }
        });

        if (!refreshInDatabase) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

