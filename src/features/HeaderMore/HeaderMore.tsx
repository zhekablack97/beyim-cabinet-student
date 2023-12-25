import classNames from 'classnames';
import style from './Header.module.scss';
import { title } from 'process';

interface IHeaderMore {
    onBack?: () => void;
    title?: string;
    subTitle?: string;
}

export const HeaderMore: React.FC<IHeaderMore> = ({
    onBack,
    subTitle,
    title,
    ...rest
}) => {
    return (
        <header
            className={classNames(
                'h-14 flex sticky top-0 items-center px-6',
                style.wrapper,
            )}
            {...rest}
        >
            <button
                onClick={onBack}
                className={classNames(
                    'w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 grow-0',
                    style.button,
                )}
            >
                <img
                    src="/icons/arrowBack.svg"
                    className="w-6 h-6 block"
                    alt=""
                />
            </button>
            <div className="ml-[121px]">
                <h2 className={classNames('text-base font-bold', style.title)}>
                    {title}
                </h2>
                <span
                    className={classNames('text-xs font-medium', style.subText)}
                >
                    {subTitle}
                </span>
            </div>
        </header>
    );
};
