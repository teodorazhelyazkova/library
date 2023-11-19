import { Typography } from '@mui/material';
import styles from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <section className={styles.NotFound}>
            <Typography variant='h2'>Page does not exist!</Typography>;
        </section>
    );
};
