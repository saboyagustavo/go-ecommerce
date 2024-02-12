import { Order, Product } from '@/models';
import { AuthService } from './auth.service';

export class OrderService {
	constructor(private authService: AuthService) {}

	async getOrder(orderId: string): Promise<Order> {
		let response;

		try {
			response = await fetch(`${process.env.ORDERS_API_URL}/orders/${orderId}`, {
				headers: {
					Authorization: `Bearer ${this.authService.getToken()}`,
				},
				next: { revalidate: 1 },
			});

			if (!response.ok) {
				throw new Error(`Failed fetching order ${orderId}`);
			}
		} catch (error: any) {
			console.error(`Failed fetching order ${orderId}`, error);
		}

		return response?.json();
	}

	async getOrders(): Promise<Order[]> {
		let orders: Order[];

		try {
			const response = await fetch(`${process.env.ORDERS_API_URL}/orders`, {
				headers: {
					Authorization: `Bearer ${this.authService.getToken()}`,
				},
				next: { revalidate: 1 },
			});

			if (!response.ok) {
				throw new Error('Failed fetching orders');
			}
			orders = await response.json();
		} catch (error: any) {
			orders = [];
			console.error('Failed fetching orders:', error);
		}

		return orders;
	}

	async createOrder(input: {
		card_hash: string;
		items: { product_id: string; quantity: number }[];
	}): Promise<Order> {
		const response = await fetch(`${process.env.ORDERS_API_URL}/orders`, {
			method: 'POST',
			body: JSON.stringify({
				card_hash: input.card_hash,
				items: input.items.map(item => ({
					product_id: item.product_id,
					quantity: item.quantity,
				})),
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.authService.getToken()}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			const error = data;
			throw new Error(error.message);
		}

		return data;
	}
}

export class OrderServiceFactory {
	static create() {
		const authService = new AuthService();
		return new OrderService(authService);
	}
}
