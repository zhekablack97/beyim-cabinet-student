import React from 'react';
import style from './EmptyResult.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IEmptyResult {
    value?: string;
}

export const EmptyResult: React.FC<IEmptyResult> = ({ value }) => {
    const { t } = useTranslation(); //локализация

    return (
        <div className="col-span-8 col-start-3 flex flex-col pt-[72px]">
            <img src="/icons/loupe-search.svg" alt="" className='w-16 h-16 block mb-6'/>
            <h2 className='text-xl font-medium mb-6'>
                {t('search.empty.title1')}{' '}
                <span className={classNames(style.blue, 'text-xl font-medium')}>“{value}”</span>
                <span className='text-xl font-medium'>{' '}{t('search.empty.title2')}</span>
            </h2>
            <p className={classNames('mb-2 font-semibold', style.paragraph)}>
            {t('search.empty.subTitle')}
            </p>
            <ul className={classNames('list-disc pl-4', style.list)}>
                <li className=''>{t('search.empty.li1')}</li>
                <li>{t('search.empty.li2')}</li>
                <li>{t('search.empty.li3')}</li>
            </ul>
        </div>
    );
};
