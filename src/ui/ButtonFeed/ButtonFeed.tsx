import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import style from './ButtonFeed.module.scss';

interface IButtonFeed extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ButtonFeed: React.FC<IButtonFeed> = ({ ...props }) => {
    return (
        <button
            className={classNames(
                'rounded-2xl  h-11 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] p-3',
                style.more,
            )}
            {...props}
        />
    );
};
