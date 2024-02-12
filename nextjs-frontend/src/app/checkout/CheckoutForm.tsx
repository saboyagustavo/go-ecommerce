'use client';

import { checkoutAction } from '@/server-actions/checkout.action';
import { Paid as PaidIcon } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const card_hash_example = '9bbef19476623ca56c17da75fd57734dbf82530686043a6e491c6d71befe8f6e';

export function CheckoutForm() {
	return (
		<Box
			component='form'
			action={checkoutAction}
		>
			<input type='hidden' name='card_hash' value={card_hash_example} />

			<Grid2 container spacing={3}>
				<Grid2 xs={12} md={6}>
					<TextField
						name='cc-name'
						required
						label='Cardholder name'
						fullWidth
						autoComplete='cc-name'
						variant='standard'
						placeholder='Name Printed N Lastname'
						defaultValue='John Johnny Doe'
						disabled
					/>
				</Grid2>

				<Grid2 xs={12} md={6}>
					<TextField
						name='cc-number'
						required
						label='Card number'
						fullWidth
						autoComplete='cc-number'
						variant='standard'
						placeholder='XXXX XXXX XXXX XXXX'
						defaultValue='1234 5678 1234 5678'
						disabled
					/>
				</Grid2>

				<Grid2 xs={12} md={6}>
					<TextField
						name='cc-exp'
						required
						label='Expiry Date'
						fullWidth
						autoComplete='cc-exp'
						variant='standard'
						placeholder='MM/YYYY'
						defaultValue='12/2999'
						disabled
					/>
				</Grid2>

				<Grid2 xs={12} md={6}>
					<TextField
						name='cc-csc'
						required
						label='CVV'
						helperText='Card security code'
						placeholder='XXX'
						defaultValue='123'
						disabled
					/>
				</Grid2>
			</Grid2>
			<Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
				<Button type='submit' sx={{ mt: 3 }} startIcon={<PaidIcon />}>
					Submit
				</Button>
			</Box>
		</Box>
	);
}
