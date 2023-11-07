import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { DeleteButton } from '../../components/DeleteButton/DeleteButton';
import { EDIT_PATH } from '../../constants/paths';
import { useContext } from 'react';
import { rootStoreContext } from '../../App';
import styles from './Book.module.scss';
import { Typography } from '@mui/material';

export const Book = () => {
    const rootStore = useContext(rootStoreContext);
    const params = useParams<{ id: string }>();
    const bookDetails = rootStore.booksStore.books.find((book) => params.id === book.id)!;

    return (
        <div className={styles.Book}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
                {bookDetails.title}
            </Typography>
            <p className={styles.Book__Author}>{bookDetails.author}</p>
            <div className={styles.Book__Buttons}>
                <DeleteButton id={bookDetails.id} />
                <Link
                    to={`${EDIT_PATH}/${bookDetails.id}`}
                    className={classNames('button', styles.Book__EditButton)}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};
