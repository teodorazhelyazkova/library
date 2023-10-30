import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CATALOG_PATH } from '../../constants/paths';
import { RemoveButton } from '../RemoveButton/RemoveButton';
import styles from './BookItem.module.scss';

export interface IBook {
    id: string;
    author: string;
    title: string;
}

interface IBookItemProps {
    book: IBook;
}

export const BookItem: FC<IBookItemProps> = ({ book }: IBookItemProps) => {
    return (
        <div id={book.id} className={styles.Book}>
            <p className={styles.Book__Author}>{book.author}</p>
            <h1>{book.title}</h1>
            <div className='buttons-container'>
                <Link
                    to={`${CATALOG_PATH}/${book.id}`}
                    className={classNames('button', styles.Book__Button)}
                >
                    Details
                </Link>
                <RemoveButton id={book.id} />
            </div>
        </div>
    );
};
