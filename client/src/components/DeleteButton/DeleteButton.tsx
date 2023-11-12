import classNames from 'classnames';
import styles from './DeleteButton.module.scss';

interface IDeleteButtonProps {
    deleteHandler: () => void;
}

export const DeleteButton: React.FC<IDeleteButtonProps> = ({
    deleteHandler,
}: IDeleteButtonProps) => {
    return (
        <button className={classNames('button', styles.DeleteButton)} onClick={deleteHandler}>
            Delete
        </button>
    );
};
