import classNames from 'classnames';
import { Post } from '../../../types/GetContentsResponseApiType';

import style from '../../../features/VideoPost/VideoPost.module.scss';
import styleBoarding from '../OnboardingComponents.module.scss';

import { HeaderPost } from '../../HeaderPost';
import { BlockVideo } from '../../VideoPost/utils';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';
import { useEffect, useState } from 'react';

export const VideoOnboarding: React.FC<{
    currentStep: number;
}> = ({ currentStep }) => {
    const { t } = useTranslation();
    const data = getData();
    const [levelSame, setLevelSame] = useState('5');
    useEffect(() => {
        if (currentStep === 5) {
            setLevelSame('5');
        }
        if (currentStep === 6) {
            setLevelSame('6');
        }
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
                            src={'/icons/activeHeart.svg'}
                            alt=""
                            className="block h-7 w-7"
                        />{' '}
                        <span
                            className={classNames(
                                'text-base font-bold ',
                                style.count,
                                style.active,
                            )}
                        >
                            0
                        </span>
                    </button>{' '}
                    <button
                        type="button"
                        className="flex gap-2 items-center h-7 justify-between"
                    >
                        <img
                            src={'/icons/bookmarkActive.svg'}
                            alt=""
                            className="block h-7 w-7"
                        />{' '}
                        <span
                            className={classNames(
                                'text-base font-bold ',
                                style.count,
                                style.active,
                            )}
                        >
                            0
                        </span>
                    </button>
                </div>
                <button
                    data-tooltip-id="6"
                    className={`${styleBoarding.button_info} ${styleBoarding.button_info_text}`}
                >
                    подробнее
                </button>
            </footer>
        </article>
    );
};
