import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, List, ListItemButton, ListItemText, Stack, Toolbar, Box } from '@mui/material';
import { HOME_PATH, pageNamesAndPaths } from '../../constants/paths';

export const Nav: FC = observer(() => {
    const location = useLocation();

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
                        {pageNamesAndPaths.map((page) => (
                            <ListItemButton
                                key={page.name}
                                selected={location.pathname === page.path}
                                component={Link}
                                to={page.path}
                            >
                                <ListItemText primary={page.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </Stack>
            </Toolbar>
        </AppBar>
    );
});
