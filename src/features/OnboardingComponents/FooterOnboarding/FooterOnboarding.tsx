import classNames from 'classnames';
import React from 'react';
import style from '../../../features/ImagePost/ImagePost.module.scss';
import styleBoarding from '../OnboardingComponents.module.scss';

export const FooterOnboarding: React.FC = () => {
    return (
        <footer className="flex justify-between items-center">
            <div className="flex gap-4">
                <button
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
                className={`${styleBoarding.button_info} ${styleBoarding.button_info_text}`}
            >
                подробнее
            </button>
        </footer>
    );
};
