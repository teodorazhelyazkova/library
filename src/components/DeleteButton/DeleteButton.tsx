import { useCallback, useContext } from 'react';
import classNames from 'classnames';
import * as bookService from '../../services/bookService';
import styles from './DeleteButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { CATALOG_PATH } from '../../constants/paths';
import { rootStoreContext } from '../../App';

interface IDeleteButtonProps {
    id: string;
}

export const DeleteButton: React.FC<IDeleteButtonProps> = ({ id }: IDeleteButtonProps) => {
    const rootStore = useContext(rootStoreContext);
    const navigate = useNavigate();
    const deleteHandler = useCallback(
        async (event: React.MouseEvent) => {
            event.stopPropagation();
            await bookService.deleteBook(id);
            rootStore.booksStore.deleteBook(id);
            navigate(CATALOG_PATH);
        },
        [id, navigate, rootStore.booksStore],
    );

    return (
        <button className={classNames('button', styles.DeleteButton)} onClick={deleteHandler}>
            Delete
        </button>
    );
};
