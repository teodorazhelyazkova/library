import { Typography } from '@mui/material';
import { BookItem, IBook } from '../BookItem/BookItem';
import styles from './BooksList.module.scss';
import { FC } from 'react';

interface IBooksListProps {
    books: IBook[];
    noResultsText: string;
}

export const BooksList: FC<IBooksListProps> = ({ books, noResultsText }) => {
    return (
        <section className={styles.BooksList}>
            {!books.length ? (
                <Typography variant='h5'>{noResultsText}</Typography>
            ) : (
                books.map((book: IBook) => <BookItem book={book} key={`book-${book._id}`} />)
            )}
        </section>
    );
};
