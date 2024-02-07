import { Total } from '@/components/Total/total';
import { Order, OrderStatus } from '@/models';
import { Check as CheckIcon } from '@mui/icons-material';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

const order: Order = {
	id: 'order-12345',
	total: 25.99,
	status: OrderStatus.PENDING,
	items: [
		{
			id: 'item-1',
			quantity: 1,
			price: 19.99,
			product: {
				id: '0product-1random-2uuid-3generated',
				name: 'Some product',
				description: 'Some product description',
				price: 175,
				image_url: 'https://source.unsplash.com/random?product',
				category_id: '0category-1random-2uuid-3generated',
			},
		},
		{
			id: 'item-2',
			quantity: 1,
			price: 5.99,
			product: {
				id: '1product-2random-3uuid-4generated',
				name: 'Some product',
				description: 'Some product description',
				price: 985,
				image_url: 'https://source.unsplash.com/random?product',
				category_id: '1category-2random-3uuid-4generated',
			},
		},
	],
	created_at: '2024-02-07T13:01:00.000Z',
};

function CheckoutSuccessPage({ params }: { params: { orderId: string } }) {
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
                justifyContent: 'center'
              }}
            >
              <CheckIcon sx={{ color: "success.main", mr: 2, fontSize: 150 }}/>
            </Box>

            <Typography variant="h4" sx={{textAlign: "center" }}>
              Order requested successfully!
            </Typography>
          </Box>
        </Grid2>

        <Grid2 xs={12} md={6}>
          <Typography variant="h4">Order Summary</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty.</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.items.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-uS', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(item.price * item.quantity)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{display: 'flex', justifyContent: 'end'}}>
                    <Total total={order.total} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default CheckoutSuccessPage;
