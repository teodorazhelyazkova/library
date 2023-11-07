import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Nav } from '../../components/Nav/Nav';

export const RootLayout: React.FunctionComponent = observer(() => {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    );
});
