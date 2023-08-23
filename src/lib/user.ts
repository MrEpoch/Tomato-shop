import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { prisma } from './db';
import type { Prisma } from '@prisma/client';
import { hashPassword } from './auth';
import { verifyRefreshToken } from 'lib';

export async function createUser(
	fullName: string,
	email: string,
	password: string
): Promise<Prisma.UserCreateInput> {
	if (fullName === undefined) {
		throw new Error('Name is required');
	} else if (email === undefined) {
		throw new Error('Email is required');
	} else if (password === undefined) {
		throw new Error('Password is required');
	} else if (!isEmail(email)) {
		throw new Error('Email is invalid');
	} else if (isEmpty(password)) {
		throw new Error('Password is required');
	} else if (isEmpty(fullName)) {
		throw new Error('Name is required');
	} else if (password.length < 8) {
		throw new Error('Password must be at least 8 characters');
	} else if (fullName.length < 3) {
		throw new Error('Name must be at least 3 characters');
	}

	try {
		const user = await prisma.user.create({
			data: {
				fullName,
				email,
				password: await hashPassword(password)
			}
		});

		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getUserByEmail(email: string): Promise<any> {
	if (email === undefined) {
		throw new Error('Email is required');
	} else if (!isEmail(email)) {
		throw new Error('Email is invalid');
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function getUserById(id: string): Promise<any> {
	if (id === undefined) {
		throw new Error('Id is required');
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateUserFullNameOrEmail(
	id: string,
	fullName: string,
	email: string
): Promise<any> {
	if (fullName === undefined) {
		throw new Error('Name is required');
	} else if (email === undefined) {
		throw new Error('Email is required');
	} else if (!isEmail(email)) {
		throw new Error('Email is invalid');
	} else if (isEmpty(fullName)) {
		throw new Error('Name is required');
	} else if (fullName.length < 3) {
		throw new Error('Name must be at least 3 characters');
	}

	try {
		const user = await prisma.user.update({
			where: {
				id
			},
			data: {
				fullName,
				email
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function updateUserPassword(id: string, password: string): Promise<any> {
	if (password === undefined) {
		throw new Error('Password is required');
	} else if (isEmpty(password)) {
		throw new Error('Password is required');
	}

	try {
		const user = await prisma.user.update({
			where: {
				id
			},
			data: {
				password: await hashPassword(password)
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function LogOut(refresh_token: string): Promise<any> {
	try {
		const decoded = await verifyRefreshToken(refresh_token);

		const user = await prisma.refresh_token.update({
			where: {
				userId_token: {
					userId: decoded.id,
					token: refresh_token
				}
			},
			data: {
				valid: false
			}
		});
		return user;
	} catch (error) {
		console.log(error);
		return null;
	}
}
