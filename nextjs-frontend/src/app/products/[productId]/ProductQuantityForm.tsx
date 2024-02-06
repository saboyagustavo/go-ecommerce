'use client';

import { Product } from '@/models';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Divider, Slider, Typography } from '@mui/material';
import { SettingsSuggest as SettingsIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { Total } from '@/components/Total/total';

const schema = yup
	.object({
		product_id: yup.string().uuid().required(),
		quantity: yup.number().integer().min(1).required(),
	})
	.required();

export function ProductQuantityForm({ product }: { product: Product }) {
	const { control, register, getValues, watch } = useForm({
		resolver: yupResolver(schema),
	});

	const [total, setTotal] = useState(product.price * getValues()['quantity']);

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (name === 'quantity' || name?.includes('attributes')) {
				setTotal(product.price * getValues()['quantity']);
			}
		});
	}, [watch, product, getValues]);

	return (
		<Box component='form' sx={{ p: 1 }} action={() => console.log('when submited, add to cart')}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 0.25,
					}}
				>
					<SettingsIcon />
					<Typography variant='h6'>Pick and add to cart</Typography>
				</Box>

				<Box display={{ xs: 'none', md: 'block' }}>
					<Total total={total} />
				</Box>
			</Box>


      <input
        type="hidden"
        value={product.id}
        {...register("product_id")}
      />
      
			<Controller
				name='quantity'
				control={control}
				defaultValue={1}
				render={({ field }) => (
					<Box sx={{ mt: 1 }}>
						<Typography>Quantity</Typography>
						<Slider
							sx={{ mt: 5 }}
							valueLabelDisplay='on'
							step={1}
							marks
							min={1}
							max={10}
							{...field}
						/>
					</Box>
				)}
			/>

			<Divider sx={{ mt: 2 }} />

			<Box 
        sx={{
          display: 'flex',
          justifyContent: 'end',
          mt: 2
        }}>
          <Button type="submit" sx={{mt: 3}} startIcon={<CartIcon/>}>
            Add to cart
          </Button>
      </Box>
		</Box>
	);
}
