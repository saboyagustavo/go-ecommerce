import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { Home as HomeIcon, ShoppingCart as CartIcon } from '@mui/icons-material';
import { SelectCategory } from './SelectCategory';
import { SearchBar } from './SearchBar';
import { AuthService } from '@/services/auth.service';

export async function Navbar() {
	const user = new AuthService().getUser();
	return (
		<AppBar position='fixed'>
			<Toolbar sx={{ backgroundColor: 'background.paper' }}>
				<Image src='/logo.png' width={147.66} height={63.66} alt='logo' priority />

				<Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', ml: 1 }}>
					<SearchBar />
				</Box>

				<IconButton LinkComponent={Link} size='large' href='/my-cart'>
					<CartIcon />
				</IconButton>

				<UserMenu user={user} />
			</Toolbar>

			<Toolbar
				sx={{
					backgroundColor: 'background.paper',
					display: 'flex',
					alignContent: 'center',
					p: 1,
				}}
			>
				<SelectCategory categories={[]} />
				<Box
					component={Link}
					href={'/products'}
					sx={{ textDecoration: 'none', display: 'flex', ml: 3 }}
				>
					<HomeIcon sx={{ color: 'text.primary' }} />
					<Typography color='text.primary' sx={{ fontWeight: 500, display: 'flex' }}>
						Home
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
