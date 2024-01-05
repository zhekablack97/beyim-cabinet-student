import classNames from 'classnames';
import { Post } from '../../../types/GetContentsResponseApiType';

import style from '../../../features/VideoPost/VideoPost.module.scss';
import { HeaderPost } from '../../../features/HeaderPost';
import { BlockVideo } from '../../../features/VideoPost/utils';
import { FooterPost } from '../../../features/FooterPost';
import FooterOnboarding from './FooterOnboarding';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';

export const VideoOnboarding: React.FC = () => {
    const { t } = useTranslation();
    const data = getData();
    return (
        <article
            className={classNames(
                style.wrapper,
                'p-4 rounded-2xl sliderImagePost',
            )}
        >
            <HeaderPost
                iconUrl={data.subjects[0].url}
                objective={data.subjects[0].objective}
                subject={data.subjects[0].name}
            />
            <div>
                <BlockVideo url={'video'} />
            </div>
            <div className="mt-3">
                <div className={`${style.accordion}`}>
                    <h3 className={`${style.accordion_title} mt-0`}>
                        {t('onboarding:post.titleVideo')}
                    </h3>
                    {t('onboarding:post.descriptionVideo')}
                </div>
                <button className={style.buttonMore}>
                    {t('onboarding:more')}
                </button>
            </div>
            <FooterOnboarding />
        </article>
    );
};
