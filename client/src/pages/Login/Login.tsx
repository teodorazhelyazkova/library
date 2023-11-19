import React, { FC, useState, useCallback, useContext } from 'react';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CATALOG_PATH, REGISTER_PATH } from '../../constants/paths';
import styles from './Login.module.scss';
// eslint-disable-next-line import/named
import { getIdToken, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { rootStoreContext } from '../../App.tsx';
import { auth } from '../../firebase.ts';
import { observer } from 'mobx-react-lite';

export const Login: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [inputError, setInputError] = useState<string>('');
    const clearErrors = useCallback(() => {
        setInputError('');
    }, []);

    const loginHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        clearErrors();

        signInWithEmailAndPassword(auth, email, password)
            .then(async (authUser: UserCredential) => {
                if (!authUser) {
                    return;
                }

                const accessToken = await getIdToken(authUser.user);
                localStorage.setItem('accessToken', accessToken);

                rootStore.authStore.setUserEmail(authUser.user.email);
                localStorage.setItem('user', rootStore.authStore.userEmail!);
                const bookList = localStorage.getItem(rootStore.authStore.userEmail!);
                if (bookList) {
                    rootStore.booksStore.setMyBookList(JSON.parse(bookList));
                }

                navigate(CATALOG_PATH);
            })
            .catch((error) => {
                if (email === '' || password === '') {
                    setInputError('All fields are required');
                } else if (error.code === 'auth/user-not-found') {
                    setInputError('No user with this email and password');
                } else if (
                    error.code === 'auth/invalid-email' ||
                    error.code === 'auth/wrong-password' ||
                    error.code === 'auth/invalid-login-credentials'
                ) {
                    setInputError('Invalid email address or password');
                } else {
                    setInputError('Something went wrong');
                }
            });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.Login}>
                <Typography component='h1' variant='h5'>
                    Login
                </Typography>
                <Box component='form' noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                value={email}
                                error={!!inputError}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                error={!!inputError}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                minHeight: '30px',
                                visibility: inputError ? 'none' : 'hidden',
                            }}
                            color='error'
                            variant='body1'
                        >
                            {inputError}
                        </Typography>
                    </Grid>
                    <Button
                        onClick={loginHandler}
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
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
});
