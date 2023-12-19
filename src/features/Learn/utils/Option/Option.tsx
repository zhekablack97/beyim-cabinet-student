import classNames from 'classnames';
import style from './Option.module.scss';

interface IOption {
    name?: string;
    isActive?: boolean;
    imageSrc?: string;
    handleClick?: () => void;
}

export const Option: React.FC<IOption> = ({
    isActive = false,
    name,
    imageSrc,
    handleClick,
    ...props
}) => {
    return (
        <li
            {...props}
            className={classNames(
                isActive ? style.active : '',
                'rounded-2xl block duration-200',
                style.wrapper,
            )}
        >
            <button
                className={classNames(
                    'px-4 flex items-center min-h-[42px]  w-full',
                )}
                type="button"
                onClick={() => {
                    if (handleClick) {
                        handleClick();
                    }
                }}
            >
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt=""
                        className="rounded-full bock mr-2 block w-6 h-6"
                    />
                )}

                <span className={classNames(style.text, 'text-sm')}>
                    {name}
                </span>
                <img src="/icons/arrowRight.svg" className="ml-auto " alt="" />
            </button>
        </li>
    );
};
