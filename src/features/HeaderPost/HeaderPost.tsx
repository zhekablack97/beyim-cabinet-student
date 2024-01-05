import { Tooltip } from 'react-tooltip';
import style from './HeaderPost.module.scss';
import classNames from 'classnames';
interface IHeaderPost {
    iconUrl: string;
    objective: string;
    subject: string;
    id?: string;
}

export const HeaderPost: React.FC<IHeaderPost> = ({
    iconUrl,
    objective,
    subject,
    id,
}) => {
    return (
        <header className="flex gap-2 mb-3">
            <img
                src={iconUrl}
                alt={objective}
                className="w-10 h-10  grow-0 shrink-0 rounded-full overflow-hidden"
                data-tooltip-id="2"
            />
            <div className=" overflow-hidden">
                <h2 className="text-base leading-5 mb-1">{subject}</h2>
                <span className=" text-sm whitespace-nowrap text-ellipsis overflow-hidden block w-96 max-w-full">
                    {objective}
                </span>
            </div>
            <div className=" ml-auto grow-0 shrink-0">
                <button data-tooltip-id={'data-post-info' + id}>
                    <img
                        src="/icons/information.svg"
                        alt=""
                        className=" w-6 h-6 block"
                    />
                </button>
                <Tooltip
                    id={'data-post-info' + id}
                    className={classNames(
                        style.wrapperTooltip,
                        'drop-shadow-2xl',
                    )}
                    clickable={true}
                    noArrow={true}
                    opacity={1}
                    place={'bottom'}
                >
                    {objective}
                </Tooltip>
                <button data-tooltip-id={'tooltip-info' + id}>
                    <img
                        src="/icons/dots.svg"
                        alt=""
                        className=" w-6 h-6 block"
                    />
                </button>
                <Tooltip
                    id={'tooltip-info' + id}
                    className={classNames(
                        style.wrapperTooltip,
                        'drop-shadow-2xl',
                    )}
                    openOnClick={true}
                    clickable={true}
                    noArrow={true}
                    opacity={1}
                    place={'bottom'}
                >
                    {objective}
                </Tooltip>
            </div>
        </header>
    );
};
