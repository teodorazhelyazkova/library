import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { BooksList } from '../../components/BooksList/BooksList';

import styles from './Catalog.module.scss';

export const Catalog: FC = observer(() => {
    return (
        <section className={styles.Catalog}>
            <BooksList />
        </section>
    );
});
