import React, { FC, useCallback, useContext, useState } from 'react';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { CATALOG_PATH, LOGIN_PATH } from '../../constants/paths';
import styles from './Register.module.scss';
import { auth } from '../../firebase.ts';
// eslint-disable-next-line import/named
import { createUserWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getIdToken } from 'firebase/auth';
import { rootStoreContext } from '../../App.tsx';
import { observer } from 'mobx-react-lite';

export const Register: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [inputError, setInputError] = useState<string>('');
    const clearErrors = useCallback(() => {
        setInputError('');
    }, []);

    const registerHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        clearErrors();

        if (password !== repeatPassword) {
            setInputError('Passwords do not match');
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (authUser: UserCredential) => {
                    if (!authUser) {
                        return;
                    }

                    const accessToken = await getIdToken(authUser.user);
                    localStorage.setItem('accessToken', accessToken);

                    rootStore.authStore.setUserEmail(authUser.user.email);
                    localStorage.setItem('user', rootStore.authStore.userEmail!);

                    navigate(CATALOG_PATH);
                })
                .catch((error) => {
                    if (email === '' || password === '' || repeatPassword === '') {
                        setInputError('All fields are required');
                    } else if (error.code === 'auth/email-already-in-use') {
                        setInputError('Email is already in use');
                    } else if (
                        error.code === 'auth/invalid-email' ||
                        error.code === 'auth/weak-password'
                    ) {
                        setInputError('Invalid email address or password');
                    } else {
                        setInputError('Something went wrong');
                    }
                });
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.Register}>
                <Typography component='h1' variant='h5'>
                    Register
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='repeatPassword'
                                label='Repeat Password'
                                type='password'
                                id='repeatPassword'
                                value={repeatPassword}
                                error={!!inputError}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
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
                    </Grid>
                    <Button
                        onClick={registerHandler}
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                    >
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
});
