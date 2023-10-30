interface ISubmitButtonProps {
    label: string;
    disabled: boolean;
}

export const SubmitButton: React.FC<ISubmitButtonProps> = (props: ISubmitButtonProps) => {
    return (
        <button type='submit' disabled={props.disabled} className='button'>
            {props.label}
        </button>
    );
};
