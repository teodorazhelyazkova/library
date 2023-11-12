import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CATALOG_PATH } from '../../constants/paths';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton, Typography } from '@mui/material';
import styles from './BookItem.module.scss';
import { rootStoreContext } from '../../App';
import { observer } from 'mobx-react-lite';

export interface IBook {
    _id: string;
    author: string;
    title: string;
    creator: string;
}

interface IBookItemProps {
    book: IBook;
}

export const BookItem: FC<IBookItemProps> = observer(({ book }: IBookItemProps) => {
    const rootStore = useContext(rootStoreContext);
    const isInMyBookList = rootStore.booksStore.myBookList.some(
        (item: IBook) => item._id === book._id,
    );
    const handleAddToBookList = () => {
        if (!isInMyBookList) {
            rootStore.booksStore.addToMyBookList(book);
        } else {
            rootStore.booksStore.removeFromMyBookList(book._id);
        }
    };
    const isCreator = book.creator === rootStore.authStore.userEmail;

    return (
        <div id={book._id} className={styles.Book}>
            <p className={styles.Book__Author}>{book.author}</p>
            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {book.title}
            </Typography>
            <div className='buttons-container'>
                {rootStore.authStore.isAuthorized && !isCreator && (
                    <IconButton onClick={handleAddToBookList}>
                        {isInMyBookList ? (
                            <FavoriteIcon color='error' />
                        ) : (
                            <FavoriteBorderIcon color='error' />
                        )}
                    </IconButton>
                )}
                <Link
                    to={`${CATALOG_PATH}/${book._id}`}
                    className={classNames('button', styles.Book__Button)}
                >
                    Details
                </Link>
            </div>
        </div>
    );
});
