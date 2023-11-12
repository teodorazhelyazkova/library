import { FC, useCallback, useContext, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import * as bookService from '../../services/bookService';
import { useNavigate } from 'react-router-dom';
import { CATALOG_PATH } from '../../constants/paths';
import { rootStoreContext } from '../../App';
import styles from './AddBook.module.scss';
import { observer } from 'mobx-react-lite';

export const AddBook: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [titleError, setTitleError] = useState<boolean>(false);
    const [authorError, setAuthorError] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitleError(false);
        setAuthorError(false);

        if (title === '' && author === '') {
            setTitleError(true);
            setAuthorError(true);
        } else if (title.length < 2) {
            setTitleError(true);
        } else if (author.length < 4) {
            setAuthorError(true);
        } else {
            const newBook = await bookService.create({
                title,
                author,
                creator: rootStore.authStore.userEmail!,
            });

            rootStore.booksStore.addBook(newBook);

            localStorage.setItem(newBook._id, rootStore.authStore.userEmail!);

            navigate(CATALOG_PATH);
        }
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
                                error={titleError}
                                helperText={titleError ? 'Title must be at least 2 characters' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label='Author'
                                value={author}
                                onChange={authorChangeHandler}
                                error={authorError}
                                helperText={
                                    authorError ? 'Author must be at least 4 characters' : ''
                                }
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
});
