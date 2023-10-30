import { FC } from 'react';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { LOGIN_PATH } from '../../constants/paths';
import styles from './Register.module.scss';

export const Register: FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            repeatPassword: data.get('repeatPassword'),
        });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.Register}>
                <Typography component='h1' variant='h5'>
                    Register
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='new-password'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='repeatPassword'
                                label='Repeat Password'
                                type='password'
                                id='repeatPassword'
                                autoComplete='new-password'
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Register
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link href={LOGIN_PATH} variant='body2'>
                                Already have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
