import { Total } from '@/components/Total/total';
import { Product } from '@/models';
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

function CartPage() {
	return (
		<Box>
			<Typography variant='h3'>
				<CartIcon /> My cart
			</Typography>
			<Grid2 container>
				<Grid2 xs={10} sm={7} md={4}>
					<List>
						{cart.items.map((item, index) => {
							const product = products.find(product => product.id === item.product_id)!;

							return (
								<React.Fragment key={index}>
									<ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 3 }}>
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
										<form>
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
							<ListItem>
								<ListItemText>No products added to cart yet</ListItemText>
							</ListItem>
						)}
					</List>

					<Box sx={{ display: 'flex', justifyContent: 'start', mt: 5 }}>
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
