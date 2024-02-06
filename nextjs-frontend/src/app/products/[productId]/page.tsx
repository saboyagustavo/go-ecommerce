import { Box, Card, CardContent, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { LocalOffer as OfferIcon, Description as DescIcon } from '@mui/icons-material';
import { ProductQuantityForm } from './ProductQuantityForm';

function ProductDetailPage({ params }: { params: { productId: string } }) {
	const product = {
		id: '0product-1random-2uuid-3generated',
		name: 'Some product',
		description: 'Some product description',
		price: 175,
		image_url: 'https://source.unsplash.com/random?product',
		category_id: '0category-1random-2uuid-3generated',
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 xs={12} md={7} position={'relative'} sx={{ height: { xs: '360px', md: 'unset' } }}>
				<Image
					src={product.image_url}
					layout='fill'
					style={{ objectFit: 'cover' }}
					priority
					alt={product.name}
				/>
			</Grid2>

			<Grid2 xs={12} md={5}>
				<Typography variant='h4'>{product.name}</Typography>
				<Box
					mt={2}
					sx={{
						color: 'primary.main',
						display: 'flex',
						gap: 0.25,
					}}
				>
					<DescIcon />
					<Typography variant='button' display='block'>
						Description
					</Typography>
				</Box>
				<Typography sx={{ mt: 2, ml: 3 }}>{product.description}</Typography>
				<Box
					mt={2}
					sx={{
						color: 'primary.main',
						display: 'flex',
						alignItems: 'center',
						gap: 0.25,
					}}
				>
					<OfferIcon />
					<Typography variant='button'>Price</Typography>
				</Box>

				<Typography sx={{ mt: 2, ml: 3 }}>
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
					}).format(product.price)}
				</Typography>

				<Card sx={{ mt: 1 }} raised={true}>
					<CardContent>
						<ProductQuantityForm product={product} />
					</CardContent>
				</Card>
			</Grid2>
		</Grid2>
	);
}

export default ProductDetailPage;
