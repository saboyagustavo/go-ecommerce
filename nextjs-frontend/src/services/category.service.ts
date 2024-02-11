import { Category } from '@/models';

export class CategoryService {
	async getCategories(): Promise<Category[]> {
		let categories: Category[];
		try {
			const response = await fetch(`${process.env.PRODUCTS_API_URL}/category`, {
				next: {
					revalidate: 1,
				},
			});

			if (!response.ok) {
				throw new Error('Failed fetching categories');
			}

			categories = await response.json();
		} catch (error: any) {
			console.error('Failed fetching categories', error);
			categories = [];
		}

		return categories;
	}
}
