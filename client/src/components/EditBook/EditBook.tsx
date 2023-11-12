import { FC, useContext, useRef, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import * as bookService from '../../services/bookService';
import styles from './EditBook.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { rootStoreContext } from '../../App';
import { CATALOG_PATH } from '../../constants/paths';

export const EditBook: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const params = useParams();
    const titleRef = useRef<HTMLInputElement>();
    const authorRef = useRef<HTMLInputElement>();
    const [titleError, setTitleError] = useState<boolean>(false);
    const [authorError, setAuthorError] = useState<boolean>(false);
    const bookDetails = rootStore.booksStore.books.find((book) => params.id === book._id)!;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitleError(false);
        setAuthorError(false);

        const title = titleRef?.current?.value;
        const author = authorRef?.current?.value;

        if (title === '' && author === '') {
            setTitleError(true);
            setAuthorError(true);
        } else if (title && title.length < 2) {
            setTitleError(true);
        } else if (author && author.length < 4) {
            setAuthorError(true);
        } else if (title && author) {
            const updatedBook = await bookService.edit({
                _id: bookDetails._id,
                title,
                author,
                creator: bookDetails.creator,
            });

            rootStore.booksStore.editBook(updatedBook);

            localStorage.setItem(updatedBook._id, rootStore.authStore.userEmail!);

            navigate(`${CATALOG_PATH}/${params.id}`);
        }
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
                                inputRef={titleRef}
                                defaultValue={bookDetails.title}
                                error={titleError}
                                helperText={titleError ? 'Title must be at least 2 characters' : ''}
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
                                inputRef={authorRef}
                                defaultValue={bookDetails.author}
                                error={authorError}
                                helperText={
                                    authorError ? 'Author must be at least 4 characters' : ''
                                }
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
});
