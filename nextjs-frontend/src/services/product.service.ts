import { Product } from '@/models';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export class ProductService {
	async getProducts(search: string, category_id: string): Promise<Product[]> {
		let url = `${process.env.PRODUCTS_API_URL}/product`;

		if (category_id) {
			url += `/category/${category_id}`;
		}

		let products: Product[];

		try {
			const response = await fetch(url, {
				next: {
					revalidate: 1,
				},
			});

			if (!response.ok) {
				throw new Error('Failed fetching products');
			}
			products = await response.json();
		} catch (error: any) {
			products = [];
			console.error('Failed fetching products:', error);
		}

		if (search) {
			return products.filter((product: Product) => {
				return product.name.toLowerCase().includes(search.toLowerCase());
			});
		}

		return products;
	}

	async getProductsViaNextApi(search?: string, category_id?: string): Promise<Product[]> {
		const urlSearchParams = new URLSearchParams();

		if (search) {
			urlSearchParams.append('search', search);
		}

		if (category_id) {
			urlSearchParams.append('category_id', category_id);
		}

		let url = `${process.env.NEXT_API_URL}/products`;

		if (urlSearchParams.toString()) {
			url += `?${urlSearchParams.toString()}`;
		}

		let products: Product[];

		try {
			const response = await fetch(url, {
				next: {
					revalidate: 1,
				},
			});

			if (!response.ok) {
				throw new Error('Failed fetching products');
			}

			products = await response.json();
		} catch (error) {
			console.error('Error fetching products:', error);
			products = [];
		}

		return products;
	}

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    const responses = await Promise.all(
      productIds.map((productId) =>
        fetch(`${process.env.PRODUCTS_API_URL}/product/${productId}`, {
          next: {
            revalidate: 1,
          },
        })
      )
    );

    return Promise.all(responses.map((response) => response.json()));
  }

	async getProduct(productId: string): Promise<Product> {
		let response;

    try {
			 response = await fetch(`${process.env.PRODUCTS_API_URL}/product/${productId}`, {
				next: { revalidate: 1 },
			});

			if (!response.ok) {
				throw new Error(`Failed fetching product ${productId}`);
			}
		} catch (error: any) {
			console.error(`Failed fetching product ${productId}`, error);
		}

		return response?.json();
	}

	searchProducts(
		router: AppRouterInstance,
		search: string | undefined | null,
		category_id: string | undefined | null,
	) {
		let path = `/products`;
	
		const urlSearchParams = new URLSearchParams();
	
		if (search) {
			urlSearchParams.append('search', search);
		}
	
		if (category_id && category_id !== '0') {
			urlSearchParams.append('category_id', category_id);
		}
	
		if(urlSearchParams.toString()) {
			path += `?${urlSearchParams.toString()}`;
		}
	
		router.push(path)
	}
}
