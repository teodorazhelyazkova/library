import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './MyList.module.scss';
import { BooksList } from '../../components/BooksList/BooksList';

export const MyList: FC = observer(() => {
    return (
        <section className={styles.MyList}>
            <BooksList />
        </section>
    );
});
