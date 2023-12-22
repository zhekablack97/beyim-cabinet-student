import classNames from 'classnames';
import { Post } from '../../types/GetContentsResponseApiType';
import { HeaderPost } from '../HeaderPost';
import { FooterPost } from '../FooterPost';
import { BlockVideo } from './utils';
import style from './VideoPost.module.scss';

interface IVideoPost {
    data: Post;
}

export const VideoPost: React.FC<IVideoPost> = ({ data }) => {
    return (
        <article
            className={classNames(
                style.wrapper,
                'p-4 rounded-2xl sliderImagePost',
            )}
        >
            <HeaderPost
                iconUrl={data.iconUrl}
                objective={data.objective}
                subject={data.subject}
            />
            <div>
                <BlockVideo
                    url={data.resources[0]}
                    thumbnail={data.thumbnail}
                />
            </div>
            <div>контент редактора</div>
            <FooterPost postId={data.id} />
        </article>
    );
};
