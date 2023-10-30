import { FC } from 'react';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { REGISTER_PATH } from '../../constants/paths';
import styles from './Login.module.scss';

export const Login: FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.Login}>
                <Typography component='h1' variant='h5'>
                    Login
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
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link href={REGISTER_PATH} variant='body2'>
                                Do not have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
