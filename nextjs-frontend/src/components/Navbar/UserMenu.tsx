'use client';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	AccountCircle as AccountIcon,
	ShoppingCart as CartIcon,
	Logout as LogoutIcon,
	ListAlt as ListAltIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export type UserMenuProps = {
	user: any | null;
};

export function UserMenu(props: UserMenuProps) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const redirectToCart = () => {
		handleClose();
		router.push('/my-cart');
	};

	const redirectToMyOrders = () => {
		handleClose();
		router.push('/my-orders');
	};

	const handleLogout = async () => {
		handleClose();
	};

	return props.user ? (
		<>
			<IconButton size='large' onClick={handleMenu}>
				<AccountIcon />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={redirectToCart}>
					<CartIcon />
					<Typography>Cart</Typography>
				</MenuItem>

				<MenuItem onClick={redirectToMyOrders}>
					<ListAltIcon />
					<Typography>Orders</Typography>
				</MenuItem>
				
        <MenuItem onClick={handleLogout}>
					<LogoutIcon />
					<Typography>Logout</Typography>
				</MenuItem>
			</Menu>
		</>
	) : (
		<Link href={'/login'} style={{ textDecoration: 'none' }}>
			<Typography color='text.primary' sx={{ ml: 3, fontWeight: 500 }}>
				Entrar
			</Typography>
		</Link>
	);
}
