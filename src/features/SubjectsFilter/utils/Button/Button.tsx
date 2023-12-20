import classNames from 'classnames';
import style from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    imgSrc: string;
    isActive?: boolean;
}

export const Button: React.FC<IButton> = ({
    name,
    imgSrc,
    isActive = false,
    ...props
}) => {
    return (
        <button
            className={classNames(
                ' shrink-0 grow-0 w-24 h-24 flex items-center justify-center flex-col relative',
                isActive ? style.activeWrapper : '',
            )}
            title={name}
            {...props}
        >
            <div className=" mb-2 rounded-full text-center  overflow-hidden">
                <img
                    src={imgSrc}
                    alt={name}
                    title={name}
                    className=" w-10 h-10  block"
                />
            </div>
            <span
                className={classNames(
                    'whitespace-nowrap text-ellipsis  overflow-hidden max-w-full w-24 text-sm ',
                    style.name,
                    isActive ? `${style.active} font-semibold` : 'font-medium',
                )}
            >
                {name}
            </span>
        </button>
    );
};
