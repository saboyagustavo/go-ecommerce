import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { UserMenu } from './UserMenu';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { ShoppingCart as CartIcon } from '@mui/icons-material';
import { SelectCategory } from './SelectCategory';
import { SearchBar } from './SearchBar';
import { AuthService } from '@/services/auth.service';
import Grid2 from '@mui/material/Unstable_Grid2';

export async function Navbar() {
	const user = new AuthService().getUser();
	return (
		<AppBar position='fixed'>
			<Toolbar sx={{ backgroundColor: 'background.paper', width: '100%', pb: 1 }}>
				<Grid2 container spacing={3} sx={{alignItems: 'center', width: '100%'}}>
					<Grid2 xs={12} md={2}>
						<Link href={'/products'}>
							<Image src='/logo.png' width={147.66} height={63.66} alt='logo' priority />
						</Link>
					</Grid2>

					<Grid2 xs={12} md={8} sx={{display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center'}}>
						<SearchBar />
						<SelectCategory categories={[]} />
					</Grid2>

					<Grid2 xs={12} md={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
						<IconButton LinkComponent={Link} size='large' href='/my-cart'>
							<CartIcon />
						</IconButton>
						<UserMenu user={user} />
					</Grid2>
				</Grid2>
			</Toolbar>
		</AppBar>
	);
}
