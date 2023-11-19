import { FC, createContext } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import {
    ADD_BOOK_PATH,
    BOOK_DETAILS_PATH,
    CATALOG_PATH,
    EDIT_BOOK_PATH,
    HOME_PATH,
    LOGIN_PATH,
    MY_LIST_PATH,
    REGISTER_PATH,
} from './constants/paths';
import { RootLayout } from './pages/RootLayout/RootLayout';
import { Register } from './pages/Register/Register';
import { MyList } from './pages/MyList/MyList';
import { Catalog } from './pages/Catalog/Catalog';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Book } from './pages/Book/Book';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { baseTheme } from './styles/theme';
import { AddBook } from './pages/AddBook/AddBook';
import { EditBook } from './components/EditBook/EditBook';
import { RootStore } from './stores/RootStore';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { NotFound } from './pages/NotFound/NotFound';

const rootStore = new RootStore();
export const rootStoreContext = createContext(rootStore);

const App: FC = observer(() => {
    const routesConfig = createRoutesFromElements(
        <Route path={HOME_PATH} element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path={REGISTER_PATH} element={<Register />} />
            <Route path={LOGIN_PATH} element={<Login />} />
            <Route path={CATALOG_PATH} element={<Catalog />} />
            <Route
                path={ADD_BOOK_PATH}
                element={
                    <PrivateRoute>
                        <AddBook />
                    </PrivateRoute>
                }
            />
            <Route
                path={EDIT_BOOK_PATH}
                element={
                    <PrivateRoute>
                        <EditBook />
                    </PrivateRoute>
                }
            />
            <Route
                path={MY_LIST_PATH}
                element={
                    <PrivateRoute>
                        <MyList />
                    </PrivateRoute>
                }
            />
            <Route path={BOOK_DETAILS_PATH} element={<Book />} />
            <Route path='*' element={<NotFound />} />
        </Route>,
    );
    const router = createBrowserRouter(routesConfig);

    return (
        <rootStoreContext.Provider value={rootStore}>
            <ThemeProvider theme={baseTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </rootStoreContext.Provider>
    );
});

export default App;
