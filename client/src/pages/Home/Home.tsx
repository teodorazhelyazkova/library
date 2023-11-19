import { FC } from 'react';
import { Typography } from '@mui/material';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { GOOGLE_MAPS_KEY } from '../../configs/environment';

import styles from './Home.module.scss';

export const Home: FC = () => {
    const position = { lat: 42.69174, lng: 23.32436 };

    return (
        <APIProvider apiKey={GOOGLE_MAPS_KEY}>
            <section className={styles.Home}>
                <Typography variant='h2' sx={{ alignSelf: 'center' }}>
                    Welcome to the Library!
                </Typography>
                <Map zoom={19} center={position}>
                    <Marker position={position} />
                </Map>
            </section>
        </APIProvider>
    );
};
