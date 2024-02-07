import { Total } from '@/components/Total/total';
import { Product } from '@/models';
import {
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CheckoutForm } from './CheckoutForm';

const products: Product[] = [
	{
		id: '0product-1random-2uuid-3generated',
		name: 'Some product',
		description: 'Some product description',
		price: 175,
		image_url: 'https://source.unsplash.com/random?product',
		category_id: '0category-1random-2uuid-3generated',
	},
	{
		id: '1product-2random-3uuid-4generated',
		name: 'Some product',
		description: 'Some product description',
		price: 985,
		image_url: 'https://source.unsplash.com/random?product',
		category_id: '1category-2random-3uuid-4generated',
	},
];

const cart = {
	items: [
		{
			product_id: '1product-2random-3uuid-4generated',
			quantity: 2,
			total: 1970,
		},
		{
			product_id: '0product-1random-2uuid-3generated',
			quantity: 4,
			total: 700,
		},
	],
	total: 2670,
};

function CheckoutPage() {
	return (
		<Box>
			<Typography variant='h3'>Checkout</Typography>
			<Grid2 container spacing={3}>
				<Grid2 xs={12} md={6}>
					<CheckoutForm />
				</Grid2>

				<Grid2 xs={0} md={1}>
					<Divider orientation='vertical' />
				</Grid2>

				<Grid2 xs={12} md={5}>
					<Typography variant='h5'>Order summary</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell>Qty.</TableCell>
								<TableCell>Price</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{cart.items.map((item, index) => {
								const product = products.find(product => product.id === item.product_id)!;
								return (
									<TableRow key={index}>
										<TableCell>{product.name}</TableCell>
										<TableCell>{item.quantity}</TableCell>
										<TableCell>
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(item.total)}
										</TableCell>
									</TableRow>
								);
							})}

							<TableRow>
								<TableCell colSpan={3}>
									<Box sx={{ display: 'flex', justifyContent: 'end' }}>
										<Total total={cart.total} />
									</Box>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Grid2>
			</Grid2>
		</Box>
	);
}

export default CheckoutPage;
