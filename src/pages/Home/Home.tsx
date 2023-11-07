import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Typography } from '@mui/material';
import styles from './Home.module.scss';

export const Home: FC = observer(() => {
    return (
        <section className={styles.Home}>
            <Typography variant='h2'>Welcome to the Library!</Typography>
        </section>
    );
});
