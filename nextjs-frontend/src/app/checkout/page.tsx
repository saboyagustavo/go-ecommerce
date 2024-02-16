import { Total } from '@/components/Total/total';
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
import { CartService, CartServiceFactory } from '@/services/cart.service';
import { ProductService } from '@/services/product.service';

async function CheckoutPage() {
	const cartService = CartServiceFactory.create();
	const productService = new ProductService();
	const cart = cartService.getCart();
	const products = await productService.getProductsByIds(cart.items.map(item => item.product_id));
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
