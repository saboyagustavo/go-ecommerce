import { Total } from '@/components/Total/total';
import { OrderStatus } from '@/models';
import { OrderServiceFactory } from '@/services/order.service';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

async function MyOrderDetail({ params }: { params: { orderId: string } }) {
	const order = await OrderServiceFactory.create().getOrder(params.orderId);
	return (
		<Box>
			<Grid2 container spacing={2}>
				<Grid2 xs={12} md={6}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							{order.status === OrderStatus.PENDING ? (
								<Typography variant='h1' sx={{ color: 'warning.main' }}>
									⏳
								</Typography>
							) : order.status === OrderStatus.PAID ? (
								<Typography variant='h1' sx={{ color: 'success.main' }}>
									✔
								</Typography>
							) : (
								<Typography variant='h1' sx={{ color: 'error.main' }}>
									✖
								</Typography>
							)}
						</Box>
						<Typography variant='h5' sx={{ textAlign: 'center' }}>
							{order.status === OrderStatus.PENDING
								? 'Order still being processed'
								: order.status === OrderStatus.PAID
								? 'Order successfully paid '
								: 'Order cancelled'}
						</Typography>
					</Box>
				</Grid2>

				<Grid2 xs={12} md={6}>
					<Typography variant='h4'>Order summary</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell>Qty.</TableCell>
								<TableCell>Price</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{order.items.map((item, key) => {
								return (
									<TableRow key={key}>
										<TableCell>{item.product.name}</TableCell>
										<TableCell>{item.quantity}</TableCell>
										<TableCell>
											{new Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'USD',
											}).format(item.product.price)}
										</TableCell>
									</TableRow>
								);
							})}
							<TableRow>
								<TableCell colSpan={3}>
									<Box sx={{ display: 'flex', justifyContent: 'end' }}>
										<Total total={order.total} />
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

export default MyOrderDetail;
