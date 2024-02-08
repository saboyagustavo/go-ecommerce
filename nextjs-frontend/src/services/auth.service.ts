import { User } from '@/models';
import { cookies } from 'next/headers';
import { string } from 'yup';

export class AuthService {
	async login(input: { email: string; password: string }) {
		//TODO: hash user sensitive data
		const response = await fetch(`${process.env.ORDERS_API_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				email: input.email,
				password: input.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 401) {
			return { error: 'Invalid credentials' };
		}

		if (!response.ok) {
			const error = await response.json();
			return { error };
		}

		const data = await response.json();

		//TODO: use cryptography in cookies
		const cookieStore = cookies();
		cookieStore.set('token', data.access_token);
	}

	logout() {
		const cookieStore = cookies();
		cookieStore.delete('token');
	}

	getUser(): User | null {
		const cookieStore = cookies();
		const token = cookieStore.get('token')?.value;

		if (!token) {
			return null;
		}

		const payloadBase64 = token.split('.')[1];
		const payloadDecoded = Buffer.from(payloadBase64, 'base64').toString('utf-8');

		const {
			username,
			userId,
			exp,
			iat,
		}: {
			username: string;
			userId: string;
			exp: number;
			iat: number;
		} = JSON.parse(payloadDecoded);

		
		return {
      username,
      userId,
      exp: new Date(exp * 1000),
      iat: new Date(exp * 1000),
    };
	}

	getToken() {
		const cookieStore = cookies();
		const token = cookieStore.get('token')?.value;

		if (!token) {
			return null;
		}

		return token;
	}

	isTokenExpired() {
		const user = this.getUser();

    if (!user) return true;

		const now = new Date();

		return user.exp < now;
	}
}
