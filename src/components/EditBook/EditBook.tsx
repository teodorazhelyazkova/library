import { FC } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import styles from './EditBook.module.scss';
import { useParams } from 'react-router-dom';

const books = [
    {
        id: 'd953e5fb-a585-4d6b-92d3-ee90697398a0',
        author: 'J.K.Rowling',
        title: "Harry Potter and the Philosopher's Stone",
    },
    {
        id: 'd953e5fb-a585-4d6b-92d3-ee90697398a1',
        author: 'Svetlin Nakov',
        title: 'C# Fundamentals',
    },
];

export const EditBook: FC = () => {
    const params = useParams();
    const bookDetails = books.find((book) => params.id === book.id)!;

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
            <Box className={styles.EditBook}>
                <Typography component='h1' variant='h5'>
                    Edit Book
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='standard'
                                required
                                fullWidth
                                id='book'
                                label='Book'
                                name='book'
                                defaultValue={bookDetails.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='standard'
                                required
                                fullWidth
                                name='author'
                                label='Author'
                                type='author'
                                id='author'
                                defaultValue={bookDetails.author}
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Edit
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
