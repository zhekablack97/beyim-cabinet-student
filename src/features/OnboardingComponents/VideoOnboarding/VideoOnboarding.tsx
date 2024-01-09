import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { HeaderPost } from '../../HeaderPost';
import { BlockVideo } from '../../VideoPost/utils';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';

import style from '../../../features/VideoPost/VideoPost.module.scss';
import styleBoarding from '../OnboardingComponents.module.scss';
import styleLike from '../../../features/like/Like.module.scss';
import styleBookmark from '../../../features/Bookmark/Bookmark.module.scss';

export const VideoOnboarding: React.FC<{
    currentStep: number;
}> = ({ currentStep }) => {
    const { t } = useTranslation();

    const data = getData();

    const [levelSame, setLevelSame] = useState('5');
    const [activeLike, setActiveLike] = useState(false);
    const [activeBookmark, setActiveBookmark] = useState(false);
    const [activeButton, setActiveButton] = useState(false);

    useEffect(() => {
        if (currentStep === 5) {
            setLevelSame('5');
        }
        if (currentStep === 6) {
            setLevelSame('6');
        }
        if (currentStep === 5) {
            setTimeout(() => {
                setActiveLike(true);
                setActiveBookmark(true);
            }, 800);
        }
        if (currentStep === 6) {
            setActiveButton(true);
            setTimeout(() => {
                setActiveButton(false);
            }, 500);
        }
        if (currentStep !== 5 && currentStep !== 6) {
            setActiveLike(false);
            setActiveBookmark(false);
        }
        setActiveBookmark(false);
        setActiveLike(false);
    }, [currentStep]);

    return (
        <article
            className={classNames(
                style.wrapper,
                'p-4 rounded-2xl sliderImagePost',
                currentStep === 5 || currentStep === 6 ? 'z-210' : '',
            )}
            id={`step-${levelSame}`}
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
                        {t('onboarding.post.titleVideo')}
                    </h3>
                    {t('onboarding.post.descriptionVideo')}
                </div>
                <button className={style.buttonMore}>
                    {t('onboarding.more')}
                </button>
            </div>
            <footer className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button
                        data-tooltip-id="5"
                        type="button"
                        className="flex gap-2 items-center h-7 justify-between"
                    >
                        <img
                            src={
                                activeLike
                                    ? '/icons/activeHeart.svg'
                                    : '/icons/Heart.svg'
                            }
                            alt=""
                            className="block h-7 w-7"
                        />{' '}
                        <span
                            className={classNames(
                                'text-base font-bold ',
                                styleLike.count,
                                activeLike && styleLike.active,
                            )}
                        >
                            {activeLike ? '14' : '13'}
                        </span>
                    </button>{' '}
                    <button
                        type="button"
                        className="flex gap-2 items-center h-7 justify-between"
                    >
                        <img
                            src={
                                activeBookmark
                                    ? '/icons/bookmarkActive.svg'
                                    : '/icons/bookmark.svg'
                            }
                            alt=""
                            className="block h-7 w-7"
                        />{' '}
                        <span
                            className={classNames(
                                'text-base font-bold ',
                                styleBookmark.count,
                                activeBookmark && styleBookmark.active,
                            )}
                        >
                            {activeBookmark ? '32' : '31'}
                        </span>
                    </button>
                </div>
                <button
                    data-tooltip-id="6"
                    className={`${styleBoarding.button_info} ${
                        styleBoarding.button_info_text
                    } ${activeButton ? styleBoarding.activeButton : ''}`}
                >
                    {t('onboarding.detail')}
                </button>
            </footer>
        </article>
    );
};
