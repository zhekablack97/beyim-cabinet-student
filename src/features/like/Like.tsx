import classNames from 'classnames';
import {
    useDeleteLikeMutation,
    useGetCountQuery,
    useGetUserLikedThisPostQuery,
    usePostLikeMutation,
} from '../../api/contentInteractionApi';
import style from './Like.module.scss';
import { useEffect, useState } from 'react';

interface ILike {
    postId: string;
}

export const Like: React.FC<ILike> = ({ postId }) => {
    const { data } = useGetUserLikedThisPostQuery({ postId });
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const { data: count, refetch: refetchCount } = useGetCountQuery({ postId });
    const [postLike] = usePostLikeMutation();
    const [deleteLike] = useDeleteLikeMutation();

    useEffect(() => {
        if (data) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [data]);

    return (
        <button
            className="flex gap-2 items-center h-7 justify-between"
            onClick={() => {
                if (isLiked) {
                    deleteLike({ postId })
                        .unwrap()
                        .then(() => {
                            refetchCount();
                        });
                    setIsLiked(false);
                } else {
                    postLike({ postId })
                        .unwrap()
                        .then(() => {
                            setIsLiked(true);
                            refetchCount();
                        });
                }
            }}
        >
            <img
                src={isLiked ? '/icons/activeHeart.svg' : '/icons/heart.svg'}
                alt=""
                className="block h-7 w-7"
            />{' '}
            <span
                className={classNames(
                    'text-base font-bold ',
                    style.count,
                    isLiked ? style.active : '',
                )}
            >
                {count?.data.data}
            </span>
        </button>
    );
};
