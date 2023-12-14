import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import style from './ChangingLanguage.module.scss';
import classNames from 'classnames';
import { useState } from 'react';

export const ChangingLanguage: React.FC = () => {
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    return (
        <div>
            <button
                data-tooltip-id="my-tooltip-click"
                className="flex h-6 text-sm items-center gap-1"
                data-tooltip-offset={24}
            >
                {locale === 'kk' ? 'Қаз' : locale === 'ru' ? 'Rus' : 'Eng'}
                <img src="/icons/arrowDown.svg" />
            </button>
            <div className="z-10  relative	">
                <Tooltip
                    id="my-tooltip-click"
                    className={classNames(
                        style.wrapperTooltip,
                        'drop-shadow-2xl',
                    )}
                    openOnClick={true}
                    clickable={true}
                    noArrow={true}
                    opacity={1}
                    place={'bottom-end'}
                >
                    <div
                        className={classNames(
                            style.tooltip,
                            'flex flex-col min-w-[208px] p-0 rounded-lg relative left-[21px] overflow-hidden',
                        )}
                    >
                        <span
                            className={classNames(
                                'flex h-10 items-center pl-4 text-sm',
                            )}
                        >
                            Выбор языка
                        </span>
                        <button
                            className={classNames(
                                'flex h-10 items-center px-4 duration-200 text-sm justify-between',
                            )}
                            onClick={e => {
                                i18n.changeLanguage('ru');
                            }}
                        >
                            <span>Русский</span>
                            {locale === 'ru' && (
                                <img src="/icons/check.svg" alt="" />
                            )}
                        </button>
                        <button
                            className={classNames(
                                'flex h-10 items-center px-4 duration-200 text-sm justify-between',
                            )}
                            onClick={e => {
                                i18n.changeLanguage('kk');
                            }}
                        >
                            <span>Қазақша</span>
                            {locale === 'kk' && (
                                <img src="/icons/check.svg" alt="" />
                            )}
                        </button>
                        <button
                            className={classNames(
                                'flex h-10 items-center px-4 duration-200 text-sm justify-between',
                            )}
                            onClick={e => {
                                i18n.changeLanguage('en');
                            }}
                        >
                            <span>English</span>
                            {locale === 'en' && (
                                <img src="/icons/check.svg" alt="" />
                            )}
                        </button>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};
