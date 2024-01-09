import React from 'react';
import style from '../AssessmentBlocks.module.scss';
import { Link } from 'react-router-dom';

interface AssessmentFooterButtonProps {
    variant?: 'default' | 'info' | 'disabled';
    href?: string;
    children: any;
    callback?: (arg?: any) => void;
}

export const AssessmentFooterButton: React.FC<AssessmentFooterButtonProps> = ({
    variant = 'disabled',
    href,
    children,
    callback,
    ...props
}) => {
    return (
        <>
            {href ? (
                <Link
                    className={`${style[`button-${variant}`]}`}
                    to={href}
                    {...props}
                >
                    {children}
                </Link>
            ) : (
                <button
                    className={`${style[`button-${variant}`]}`}
                    {...props}
                    onClick={callback}
                >
                    {children}
                </button>
            )}
        </>
    );
};
