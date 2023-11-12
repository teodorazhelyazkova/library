import { FC, useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, List, ListItemButton, ListItemText, Stack, Toolbar, Box } from '@mui/material';
import {
    ADD_BOOK_PATH,
    HOME_PATH,
    LOGIN_PATH,
    MY_LIST_PATH,
    REGISTER_PATH,
    publicPageNamesAndPaths,
} from '../../constants/paths';
import { rootStoreContext } from '../../App';
import { auth } from '../../firebase';

export const Nav: FC = observer(() => {
    const rootStore = useContext(rootStoreContext);
    const location = useLocation();

    const handleLogout = useCallback(() => {
        auth.signOut();

        rootStore.authStore.resetUserEmail();

        localStorage.removeItem('accessToken');
    }, [rootStore.authStore]);

    return (
        <AppBar position='fixed' color='primary'>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Link to={HOME_PATH}>
                    <Box
                        component='img'
                        sx={{ width: '8rem', paddingRight: { xs: 1, md: 2 } }}
                        src='/books.png'
                        alt='Library'
                    />
                </Link>

                <Stack
                    direction='row'
                    spacing={2}
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    alignItems='center'
                >
                    <List
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                        component='nav'
                        aria-label='navigation'
                    >
                        {publicPageNamesAndPaths.map((page) => (
                            <ListItemButton
                                key={page.name}
                                selected={location.pathname === page.path}
                                component={Link}
                                to={page.path}
                            >
                                <ListItemText primary={page.name} />
                            </ListItemButton>
                        ))}
                        {rootStore.authStore.isAuthorized ? (
                            <>
                                <ListItemButton
                                    key='My List'
                                    selected={location.pathname === MY_LIST_PATH}
                                    component={Link}
                                    to={MY_LIST_PATH}
                                >
                                    <ListItemText primary='My List' />
                                </ListItemButton>
                                <ListItemButton
                                    key='Add Book'
                                    selected={location.pathname === ADD_BOOK_PATH}
                                    component={Link}
                                    to={ADD_BOOK_PATH}
                                >
                                    <ListItemText primary='Add Book' />
                                </ListItemButton>
                                <ListItemButton key='Logout'>
                                    <ListItemText
                                        primary='Logout'
                                        onClick={handleLogout}
                                    ></ListItemText>
                                </ListItemButton>
                            </>
                        ) : (
                            <>
                                <ListItemButton
                                    key='Login'
                                    selected={location.pathname === LOGIN_PATH}
                                    component={Link}
                                    to={LOGIN_PATH}
                                >
                                    <ListItemText primary='Login' />
                                </ListItemButton>
                                <ListItemButton
                                    key='Register'
                                    selected={location.pathname === REGISTER_PATH}
                                    component={Link}
                                    to={REGISTER_PATH}
                                >
                                    <ListItemText primary='Register' />
                                </ListItemButton>
                            </>
                        )}
                    </List>
                </Stack>
            </Toolbar>
        </AppBar>
    );
});
