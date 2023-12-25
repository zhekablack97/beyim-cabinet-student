import { Link } from 'react-router-dom';
import { Bookmark } from '../Bookmark';
import { Like } from '../like';
import classNames from 'classnames';
import style from './FooterPost.module.scss';

interface IFooterPost {
    postId: string;
    contentId: string;
}

export const FooterPost: React.FC<IFooterPost> = ({ postId, contentId }) => {
    return (
        <footer className="flex justify-between items-center">
            <div className="flex gap-4">
                <Like postId={postId} /> <Bookmark postId={postId} />
            </div>
            <Link
                to={`/feed/?idPost=${contentId}`}
                className={classNames(
                    'rounded-2xl  h-11 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] p-3',
                    style.more,
                )}
            >
                подробнее
            </Link>
        </footer>
    );
};
