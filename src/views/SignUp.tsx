import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { Register } from '../types/api'
import Swal from 'sweetalert2'
import api from '../api'

function SignUp() {
  const defaultTheme = createTheme()
  const navigate = useNavigate()

  // Handle sign up submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const confirmPassword = formData.get('confirmPassword') as string
    const signUpData: Register.Params = {
      email: formData.get('email') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      first_name: formData.get('firstname') as string,
      last_name: formData.get('lastname') as string
    }

    // Check if password match
    if (signUpData.password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password does not match',
        text: 'Please check your password',
        timer: 2000,
        showConfirmButton: true,
        timerProgressBar: true
      })
      return
    }

    try {
      // Call API to register
      await api.register(signUpData)
      Swal.fire({
        icon: 'success',
        title: 'Sign up success',
        text: 'Redirecting to sign in...',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      }).then(() => {
        navigate('/signin')
      })
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Please check your input'
      Swal.fire({
        icon: 'error',
        title: 'Sign up failed',
        text: errorMessage,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true
      })
    }
  }

  // Handle sign in click
  const handleSignInClick = () => {
    navigate('/signin')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/logo.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOpenOutlined />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='User Name'
                name='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='firstname'
                label='First Name'
                name='firstname'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='lastname'
                label='Last Name'
                name='lastname'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid
                container
                direction='column'
                item
                alignItems='center'
                justifyContent='center'
              >
                <Link
                  component='button'
                  variant='body2'
                  onClick={handleSignInClick}
                >
                  {'Change your mind? Sign in'}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default SignUp
