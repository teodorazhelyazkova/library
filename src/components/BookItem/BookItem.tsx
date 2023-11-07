import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CATALOG_PATH } from '../../constants/paths';
import { DeleteButton } from '../DeleteButton/DeleteButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Typography } from '@mui/material';
import styles from './BookItem.module.scss';
import { rootStoreContext } from '../../App';
import { observer } from 'mobx-react-lite';

export interface IBook {
    id: string;
    author: string;
    title: string;
}

interface IBookItemProps {
    book: IBook;
}

export const BookItem: FC<IBookItemProps> = observer(({ book }: IBookItemProps) => {
    const rootStore = useContext(rootStoreContext);
    const isInMyBookList = rootStore.booksStore.myBookList.some(
        (item: IBook) => item.id === book.id,
    );
    const handleAddToBookList = () => {
        if (!isInMyBookList) {
            rootStore.booksStore.addToMyBookList(book);
            console.log('add');
        } else {
            rootStore.booksStore.removeFromMyBookList(book.id);
            console.log('remove');
        }
    };

    return (
        <div id={book.id} className={styles.Book}>
            <p className={styles.Book__Author}>{book.author}</p>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {book.title}
            </Typography>
            <div className='buttons-container'>
                <IconButton onClick={handleAddToBookList}>
                    {isInMyBookList ? (
                        <FavoriteIcon color='error' />
                    ) : (
                        <FavoriteBorderIcon color='error' />
                    )}
                </IconButton>
                <Link
                    to={`${CATALOG_PATH}/${book.id}`}
                    className={classNames('button', styles.Book__Button)}
                >
                    Details
                </Link>
                <DeleteButton id={book.id} />
            </div>
        </div>
    );
});
