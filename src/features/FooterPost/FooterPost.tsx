import { Link, useSearchParams } from 'react-router-dom';
import { Bookmark } from '../Bookmark';
import { Like } from '../like';
import classNames from 'classnames';
import style from './FooterPost.module.scss';

interface IFooterPost {
    postId: string;
    contentId: string;
}

export const FooterPost: React.FC<IFooterPost> = ({ postId, contentId }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <footer className="flex justify-between items-center">
            <div className="flex gap-4">
                <Like postId={postId} /> <Bookmark postId={postId} />
            </div>
            <button
                onClick={() => {
                    setSearchParams(prev => {
                        return {
                            idContent: String(contentId) || '',
                            fromSearch: prev.get('fromSearch') || '',
                            subject: prev.get('subject') || '',
                            sectionsBySubject:
                                prev.get('sectionsBySubject') || '',
                            them: prev.get('them') || '',
                        };
                    });
                }}
                className={classNames(
                    'rounded-2xl  h-11 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] p-3',
                    style.more,
                )}
            >
                подробнее
            </button>
        </footer>
    );
};
