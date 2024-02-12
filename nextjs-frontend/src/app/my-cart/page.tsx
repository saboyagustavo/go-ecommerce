import { Total } from '@/components/Total/total';
import { removeFromCartAction } from '@/server-actions/cart.action';
import { CartServiceFactory } from '@/services/cart.service';
import { ProductService } from '@/services/product.service';
import { ShoppingCart as CartIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
	Avatar,
	Box,
	Button,
	Divider,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';

async function CartPage() {
	const cartService = CartServiceFactory.create();
	const productService = new ProductService();
	const cart = cartService.getCart();
	const products = await productService.getProductsByIds(cart.items.map(item => item.product_id));

	return (
		<Box>
			<Typography variant='h4'>
				My cart
			</Typography>
			<Grid2 container>
				<Grid2 xs={10} sm={7} md={4}>
					<List>
						{cart.items.map((item, index) => {
							const product = products.find(product => product.id === item.product_id)!;

							return (
								<React.Fragment key={index}>
									<ListItem
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'start',
											mt: 3,
										}}
									>
										<ListItemAvatar>
											<Avatar src={product.image_url} />
										</ListItemAvatar>

										<ListItemText
											primary={
												<Box
													sx={{
														display: 'flex',
														flexDirection: 'column',
													}}
												>
													<Typography variant='button'>
														{product.name} - Qtd. {item.quantity}
													</Typography>

													<Typography sx={{ color: 'primary.main' }}>
														{new Intl.NumberFormat('en-US', {
															style: 'currency',
															currency: 'USD',
														}).format(item.total)}
													</Typography>
												</Box>
											}
										/>
									</ListItem>

									<ListItem sx={{ display: 'flex', justifyContent: 'end', p: 0 }}>
										<form action={removeFromCartAction}>
											<input type='hidden' name={'product_id'} value={product.id} />
											<input type='hidden' name='index' value={index} />
											<Button color='error' startIcon={<DeleteIcon />} type='submit'>
												Remove
											</Button>
										</form>
									</ListItem>
									<Divider variant='inset' component='li' sx={{ ml: 0 }} />
								</React.Fragment>
							);
						})}
						{!cart.items.length && (
							<ListItem sx={{mt: 2}}>
								<ListItemText>No products added to cart yet</ListItemText>
							</ListItem>
						)}
					</List>

					<Box sx={{ display: 'flex', justifyContent: 'start', mt: 3 }}>
						<Total total={cart.total} />
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'start' }}>
						{cart.items.length ? (
							<Button LinkComponent={Link} href='/checkout'>
								Checkout
							</Button>
						) : (
							<Button LinkComponent={Link} href='/products'>
								Keep browsing
							</Button>
						)}
					</Box>
				</Grid2>
			</Grid2>
		</Box>
	);
}

export default CartPage;
