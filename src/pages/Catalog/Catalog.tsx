import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { BooksList } from '../../components/BooksList/BooksList';
import { rootStoreContext } from '../../App';

import styles from './Catalog.module.scss';

export const Catalog: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);

    return (
        <section className={styles.Catalog}>
            <BooksList books={rootStore.booksStore.books} noResultsText='No books in the library' />
        </section>
    );
});
