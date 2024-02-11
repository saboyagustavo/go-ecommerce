'use client';

import { FormControl, MenuItem, Select } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Category } from '../../models';
import { ProductService } from '@/services/product.service';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export function SelectCategory({ categories }: { categories: Category[] }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const productService = new ProductService();

	return (
		<FormControl size='small' sx={{ width: 160 }}>
			<Select
				name='select-category'
				sx={{ backgroundColor: grey[300] }}
				onChange={event => {
					const search = searchParams.get('search');
					const category_id = event.target.value as string;
					productService.searchProducts(router, search, category_id);
				}}
			>
				<MenuItem value='0'>Everything</MenuItem>
				{categories.map((category) => (
					<MenuItem key={category.id} value={category.id} defaultValue={0}>
						{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
