import classNames from 'classnames';
import { Post } from '../../types/GetContentsResponseApiType';
import style from './SearchItem.module.scss';

interface ISearchItem {
    data: Post;
}

export const SearchItem: React.FC<ISearchItem> = ({ data, ...rest }) => {
    return (
        <article
            className={classNames(style.wrapper, 'flex')}
            key={data.id}
            {...rest}
        >
            <div
                className={classNames(
                    'w-32 h-32 flex items-center justify-center',
                )}
            >
                <img
                    src={data.resources[0]}
                    className="max-w-[128px] max-h-[112px]"
                    alt=""
                />
            </div>
            <div></div>
        </article>
    );
};
