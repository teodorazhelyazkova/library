import { FC } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import styles from './AddBook.module.scss';

export const AddBook: FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            book: data.get('book'),
            author: data.get('author'),
        });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.AddBook}>
                <Typography component='h1' variant='h5'>
                    Add Book
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField required fullWidth id='book' label='Book' name='book' />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name='author'
                                label='Author'
                                type='author'
                                id='author'
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Add
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
