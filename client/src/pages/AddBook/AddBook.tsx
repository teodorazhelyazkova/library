import { FC, useCallback, useContext, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import * as bookService from '../../services/bookService';
import { useNavigate } from 'react-router-dom';
import { CATALOG_PATH } from '../../constants/paths';
import { rootStoreContext } from '../../App';
import styles from './AddBook.module.scss';

export const AddBook: FC = () => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newBook = await bookService.create({ title, author });

        rootStore.booksStore.addBook(newBook);

        navigate(CATALOG_PATH);
    };

    const titleChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const authorChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    }, []);

    return (
        <Container component='main' maxWidth='xs'>
            <Box className={styles.AddBook}>
                <Typography component='h1' variant='h5'>
                    Add Book
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label='Book'
                                value={title}
                                onChange={titleChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label='Author'
                                value={author}
                                onChange={authorChangeHandler}
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
