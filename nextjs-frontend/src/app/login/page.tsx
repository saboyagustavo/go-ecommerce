import { LockOutlined as LockIcon } from '@mui/icons-material';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';

function LoginPage({ searchParams }: { searchParams: { redirect_to?: string } }) {
	const { redirect_to = '/products' } = searchParams;
	const user = {
		id: 'fake_id_123',
		name: 'Fake Faker',
	};

	return (
		<Box
			sx={{
				maginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1 }}>
				<LockIcon />
			</Avatar>

			<Typography component='h1' variant='h5'>
        Sign in to your account
			</Typography>

			<Box component='form' noValidate sx={{ mt: 1 }}>
				<input type='hidden' name='redirect_to' value={redirect_to} />
				<TextField
					margin='normal'
					required
					fullWidth
					label='e-mail'
					name='email'
					type='email'
					autoComplete='email'
					defaultValue='admin@example.com'
					placeholder='example@example.com'
					autoFocus
				/>

        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          type='password'
          autoComplete='password'
          defaultValue='superadmin'
        />

        <Button
          type='submit'
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
        >
          Login
        </Button>
			</Box>
		</Box>
	);
}

export default LoginPage;
