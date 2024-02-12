import { OrderStatus } from '@/models';
import { OrderServiceFactory } from '@/services/order.service';
import { ListAltOutlined } from '@mui/icons-material';
import {
	Box,
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

async function MyOrdersPage() {
	const orderService = OrderServiceFactory.create();
	const orders = await orderService.getOrders();
	return (
		<Box>
			<Typography variant='h4'>My Orders</Typography>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Date</TableCell>
						<TableCell>Total</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Details</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{orders.map(order => {
						return (
							<TableRow key={order.id}>
								<TableCell>{order.id}</TableCell>

								<TableCell>{new Date(order.created_at).toLocaleDateString('en-US')}</TableCell>

								<TableCell>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD',
									}).format(order.total)}
								</TableCell>

								<TableCell>
									{order.status === OrderStatus.PENDING ? (
										<Typography variant='h5' sx={{ color: 'warning.main' }}>
											⏳
										</Typography>
									) : order.status === OrderStatus.PAID ? (
										<Typography variant='h5' sx={{ color: 'success.main' }}>
											✔
										</Typography>
									) : (
										<Typography variant='h5' sx={{ color: 'error.main' }}>
											✖
										</Typography>
									)}
								</TableCell>

								<TableCell>
									<Link href={`/my-orders/${order.id}`} style={{ textDecoration: 'none' }}>
										<ListAltOutlined />
									</Link>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Box>
	);
}

export default MyOrdersPage;
