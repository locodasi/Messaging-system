import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import useCreateContact from '../../hooks/contactsHook/useCreateContact';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const validationSchema = Yup.object({
    number: Yup.number().required('Number is required').min(10000000,"Number lenght must be 8 or more"),
    name: Yup.string().required('Password is required').min(3,"Password lenght must be 3 or more"),
});

const styles = {
    errorMessage: {
        color:"red",
        marginBottom: 8
    }
}

const FormContact = ()=> {
    const [createContact] = useCreateContact();
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            number: '',
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          // Handle form submission here
            try{
                await createContact({
                    number: values.number.toString(),
                    name: values.name
                })

                navigate("/");
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
                        Create Contact
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
                                    error}
                            helperText={formik.touched.number && formik.errors.number}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={(formik.touched.name && Boolean(formik.errors.name)) || 
                                    (error && error.includes("name"))}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default FormContact;