import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './MyList.module.scss';
import { BooksList } from '../../components/BooksList/BooksList';
import { rootStoreContext } from '../../App';

export const MyList: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);

    return (
        <section className={styles.MyList}>
            <BooksList
                books={rootStore.booksStore.myBookList}
                noResultsText='No books in your list'
            />
        </section>
    );
});
