import { useCallback } from 'react';
import classNames from 'classnames';
import styles from './RemoveButton.module.scss';

interface IRemoveButtonProps {
    id: string;
}

export const RemoveButton: React.FC<IRemoveButtonProps> = () => {
    const removeHandler = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
    }, []);

    return (
        <button className={classNames('button', styles.RemoveButton)} onClick={removeHandler}>
            Remove
        </button>
    );
};
