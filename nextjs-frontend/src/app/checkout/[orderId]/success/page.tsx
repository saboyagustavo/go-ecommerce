import { Total } from '@/components/Total/total';
import { OrderServiceFactory } from '@/services/order.service';
import { Check as CheckIcon } from '@mui/icons-material';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

async function CheckoutSuccessPage({ params }: { params: { orderId: string } }) {
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
