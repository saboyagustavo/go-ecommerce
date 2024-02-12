import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { ProductService } from './product.service';
import { Cart } from '@/models';

export class CartService {
	cookieStore: ReadonlyRequestCookies;

	constructor(private productService: ProductService) {
		this.cookieStore = cookies();
	}

	async addToCart(input: { product_id: string; quantity: number }) {
		const { product_id, quantity } = input;

		const cart = this.getCart();

		const product = await this.productService.getProduct(product_id);

		const cartItemPrice = product.price * quantity;

		cart.items.push({
			product_id,
			quantity,
			total: cartItemPrice,
		});

		cart.total += cartItemPrice;

		this.cookieStore.set('cart', JSON.stringify(cart));
	}

	removeItemFromCart(input: { index: number; product_id: string }) {
		const cart = this.getCart();
		const { index, product_id } = input;

		const removedItem = cart.items.find(cartItem => cartItem.product_id === product_id)!;

		cart.items.splice(index, 1);

		cart.total -= removedItem.total;

		this.cookieStore.set('cart', JSON.stringify(cart));
	}

	getCart() {
		const cartRaw = this.cookieStore.get('cart')?.value;

		const cart: Cart = cartRaw ? JSON.parse(cartRaw) : { items: [], total: 0 };

		return cart;
	}

	clearCart() {
		this.cookieStore.delete('cart');
	}
}

export class CartServiceFactory {
	static create() {
		const productService = new ProductService();
		return new CartService(productService);
	}
}
