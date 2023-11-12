import classNames from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteButton } from '../../components/DeleteButton/DeleteButton';
import { CATALOG_PATH, EDIT_PATH } from '../../constants/paths';
import { useContext } from 'react';
import { rootStoreContext } from '../../App';
import styles from './Book.module.scss';
import { IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IBook } from '../../components/BookItem/BookItem';
import { observer } from 'mobx-react-lite';
import * as bookService from '../../services/bookService';

export const Book = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const bookDetails = rootStore.booksStore.books.find((book) => params.id === book._id)!;
    const isInMyBookList = rootStore.booksStore.myBookList.some(
        (item: IBook) => item._id === bookDetails._id,
    );
    const handleAddToBookList = () => {
        if (!isInMyBookList) {
            rootStore.booksStore.addToMyBookList(bookDetails);
        } else {
            rootStore.booksStore.removeFromMyBookList(bookDetails._id);
        }
    };

    const isCreator = bookDetails.creator === rootStore.authStore.userEmail;
    const deleteHandler = async () => {
        navigate(CATALOG_PATH);
        await bookService.deleteBook(params.id!);
        rootStore.booksStore.deleteBook(params.id!);
    };

    return (
        <div className={styles.Book}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
                {bookDetails.title}
            </Typography>
            <p className={styles.Book__Author}>{bookDetails.author}</p>

            <div className={styles.Book__Buttons}>
                {isCreator && (
                    <>
                        <DeleteButton deleteHandler={deleteHandler} />
                        <Link
                            to={`${EDIT_PATH}/${bookDetails._id}`}
                            className={classNames('button', styles.Book__EditButton)}
                        >
                            Edit
                        </Link>
                    </>
                )}
                {rootStore.authStore.isAuthorized && !isCreator && (
                    <IconButton onClick={handleAddToBookList}>
                        {isInMyBookList ? (
                            <FavoriteIcon color='error' />
                        ) : (
                            <FavoriteBorderIcon color='error' />
                        )}
                    </IconButton>
                )}
            </div>
        </div>
    );
});
