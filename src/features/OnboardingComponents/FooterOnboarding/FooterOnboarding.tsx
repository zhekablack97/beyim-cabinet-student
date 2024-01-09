import classNames from 'classnames';
import React from 'react';
import styleBoarding from '../OnboardingComponents.module.scss';
import styleLike from '../../../features/like/Like.module.scss';
import { useTranslation } from 'react-i18next';
export const FooterOnboarding: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="flex justify-between items-center">
            <div className="flex gap-4">
                <button className="flex gap-2 items-center h-7 justify-between">
                    <img
                        src={'/icons/Heart.svg'}
                        alt=""
                        className="block h-7 w-7"
                    />{' '}
                    <span
                        className={classNames(
                            'text-base font-bold ',
                            styleLike.count,
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
                        src={'/icons/bookmark.svg'}
                        alt=""
                        className="block h-7 w-7"
                    />{' '}
                    <span
                        className={classNames(
                            'text-base font-bold ',
                            styleLike.count,
                        )}
                    >
                        0
                    </span>
                </button>
            </div>
            <button
                className={`${styleBoarding.button_info} ${styleBoarding.button_info_text}`}
            >
                {t('onboarding.detail')}
            </button>
        </footer>
    );
};
