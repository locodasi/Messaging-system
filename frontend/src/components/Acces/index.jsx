import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useLogin from '../../hooks/useLogin';
import { useDispatchState } from '../../contexts/StateProvider';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" target="_blank" href="https://lucas-da-silva-portafolio.onrender.com/">
                My Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    number: Yup.number().required('Number is required').min(10000000,"Number lenght must be 8 or more"),
    password: Yup.string().required('Password is required').min(8,"Password lenght must be 8 or more"),
});

const styles = {
    errorMessage: {
        color:"red",
        marginBottom: 8
    }
}

const  Acces = ()=> {

    const [login] = useLogin();
    const dispatch = useDispatchState();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            number: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          // Handle form submission here
            try{
                const dataLogin = await login({
                    number: values.number.toString(),
                    password: values.password
                })

                localStorage.setItem('messasegin-user-token', dataLogin.authenticate.value);
                dispatch({ type: "setUser", user: dataLogin.authenticate });
                window.location.reload();
            }catch(error){
                const especificError = error.graphQLErrors[0].message;
                setError(especificError);
                setTimeout(()=> setError(null),5000)
            }
        }
    });
    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        {error && <h4 style={styles.errorMessage}>{error}</h4>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="number"
                            label="Number"
                            name="number"
                            autoFocus
                            type="number"
                            value={formik.values.number}
                            onChange={formik.handleChange}
                            error={(formik.touched.number && Boolean(formik.errors.number)) || 
                                    (error && error.includes("number"))}
                            helperText={formik.touched.number && formik.errors.number}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={(formik.touched.number && Boolean(formik.errors.password)) || (error && error.includes("password"))}
                            helperText={formik.touched.number && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default Acces