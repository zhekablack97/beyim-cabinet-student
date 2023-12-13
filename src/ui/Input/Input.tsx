import { InputHTMLAttributes } from 'react';
import style from './Input.module.scss';
import classNames from 'classnames';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    register: any;
    name: string;
    label?: string;
    error?: string;
}

export const Input: React.FC<IInput> = ({
    register,
    error,
    name,
    label,
    className,
    ...rest
}) => {
    return (
        <>
            <label
                className={classNames(
                    className,
                    style.wrapper,
                    ' w-full block  rounded-lg',
                )}
            >
                <span className='text-base block font-medium'>{label}</span>
                <input
                    className={classNames(
                        ' h-12 w-full block border-[1px] rounded-lg font-medium text-base px-3 ',
                        error ? style.error : '',
                    )}
                    {...register(name)}
                    {...rest}
                />
                {error && (
                    <span className={classNames(style['error-text'], 'flex gap-1')}>
                        <img src="/icons/redInfo.svg" />
                        <span className={classNames('font-medium')}>{error}</span>
                    </span>
                )}
            </label>
        </>
    );
};
