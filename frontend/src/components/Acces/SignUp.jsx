import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useLogin from '../../hooks/useLogin';
import useCreateUSer from '../../hooks/useCreateUser';

import { useNavigate } from 'react-router-dom';

import { useDispatchState } from '../../contexts/StateProvider';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://lucas-da-silva-portafolio.onrender.com/">
        Your Website
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
  RepeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});

const styles = {
  errorMessage: {
    color:"red",
    marginBottom: 8
  }
}

const SignUp = () => {

  const [login] = useLogin();
  const [createUser] = useCreateUSer();
  const navigate = useNavigate();
  const dispatch = useDispatchState();
  const [error, setError] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      number: '',
      password: '',
      RepeatPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Handle form submission here
      //console.log(values);
      try{
        await createUser({
          number: values.number.toString(),
          password: values.password
        })

        const dataLogin = await login({
            number: values.number.toString(),
            password: values.password
        })

        localStorage.setItem('messasegin-user-token', dataLogin.authenticate.value);
        dispatch({ type: "setUser", user: dataLogin.authenticate });     
        navigate("/");
        window.location.reload();
      }catch(error){
        //console.log(error)
        const especificError = error.graphQLErrors[0].message;
        setError(especificError);
        setTimeout(()=> setError(null),5000)
      }
    },
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            {error && <h4 style={styles.errorMessage}>{error}</h4>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="number"
                  name="number"
                  label="Number"
                  type="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  error={(formik.touched.number && Boolean(formik.errors.number)) || 
                          (error && error.includes("Number"))}
                  helperText={formik.touched.number && formik.errors.number}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="RepeatPassword"
                  name="RepeatPassword"
                  label="Repeat password"
                  type="password"
                  value={formik.values.RepeatPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.RepeatPassword && Boolean(formik.errors.RepeatPassword)}
                  helperText={formik.touched.RepeatPassword && formik.errors.RepeatPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;