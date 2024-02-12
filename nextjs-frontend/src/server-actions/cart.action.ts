'use server';

import { CartServiceFactory } from '@/services/cart.service';
import { redirect } from 'next/navigation';

export async function addToCartAction(formData: FormData) {
	const cartService = CartServiceFactory.create();
	await cartService.addToCart({
		product_id: formData.get('product_id') as string,
		quantity: Number(formData.get('quantity')),
	});
	redirect('/my-cart');
}

export async function removeFromCartAction(formData: FormData) {
	const cartService = CartServiceFactory.create();
	const index = Number(formData.get('index'));
	const product_id = formData.get('product_id') as string;
	cartService.removeItemFromCart({ index, product_id });
}
