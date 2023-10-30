import { BookItem, IBook } from '../BookItem/BookItem';
import styles from './BooksList.module.scss';

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

export const BooksList = () => {
    return (
        <section className={styles.BooksList}>
            {books.map((book: IBook) => (
                <BookItem book={book} key={`book-${book.id}`} />
            ))}
        </section>
    );
};
