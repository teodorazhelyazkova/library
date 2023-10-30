import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { RemoveButton } from '../../components/RemoveButton/RemoveButton';
import { EDIT_PATH } from '../../constants/paths';
import styles from './Book.module.scss';

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

export const Book = () => {
    const params = useParams();
    const bookDetails = books.find((book) => params.id === book.id)!;

    return (
        <div className={styles.Book}>
            <h1>{bookDetails.title}</h1>
            <p className={styles.Book__Author}>{bookDetails.author}</p>
            <div className={styles.Book__Buttons}>
                <RemoveButton id={bookDetails.id} />
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
