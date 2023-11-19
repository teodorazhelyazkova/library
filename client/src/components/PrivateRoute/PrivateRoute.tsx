import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { rootStoreContext } from '../../App';
import { HOME_PATH } from '../../constants/paths';

interface IPrivateRouteProps {
    children: React.JSX.Element;
}

export const PrivateRoute = observer((props: PropsWithChildren<IPrivateRouteProps>) => {
    const { children } = props;
    const navigate = useNavigate();
    const rootStore = useContext(rootStoreContext);

    useEffect(() => {
        if (!rootStore.authStore.isAuthorized) {
            navigate(HOME_PATH);
        }
    }, [navigate, rootStore.authStore.isAuthorized]);

    return children;
});
