import { useEffect, useState } from 'react';
import {
    useDeleteBookmarkMutation,
    useGetCountBookedQuery,
    useGetUserBookmarkedThisPostQuery,
    useGetUserLikedThisPostQuery,
    usePostBookmarkMutation,
} from '../../api/contentInteractionApi';
import classNames from 'classnames';
import style from './Bookmark.module.scss';

interface IBookmark {
    postId: string;
}

export const Bookmark: React.FC<IBookmark> = ({ postId }) => {
    const { data } = useGetUserBookmarkedThisPostQuery({ postId });
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const { data: count } = useGetCountBookedQuery({ postId });
    const [postBookmark] = usePostBookmarkMutation();
    const [deleteBookmark] = useDeleteBookmarkMutation();

    useEffect(() => {
        if (data) {
            setIsBooked(true);
        } else {
            setIsBooked(false);
        }
    }, [data]);

    console.log(count, 'count book');

    return (
        <button
            className="flex gap-2 items-center h-7 justify-between"
            onClick={() => {
                if (isBooked) {
                    deleteBookmark({ postId });
                    setIsBooked(false);
                } else {
                    postBookmark({ postId })
                        .unwrap()
                        .then(() => {
                            console.log('slaldaksal');
                            setIsBooked(true);
                        });
                }
            }}
        >
            <img
                src={isBooked ? '/icons/bookmarkActive.svg' : '/icons/bookmark.svg'}
                alt=""
                className="block h-7 w-7"
            />{' '}
            <span
                className={classNames(
                    'text-base font-bold ',
                    style.count,
                    isBooked ? style.active : '',
                )}
            >
                {count?.data.data}
            </span>
        </button>
    );
};
