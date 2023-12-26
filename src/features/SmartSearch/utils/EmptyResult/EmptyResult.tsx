import React from 'react';
import style from './EmptyResult.module.scss';
import classNames from 'classnames';

interface IEmptyResult {
    value?: string;
}

export const EmptyResult: React.FC<IEmptyResult> = ({ value }) => {
    return (
        <div className="col-span-8 col-start-3 flex flex-col pt-[72px]">
            <img src="/icons/loupe-search.svg" alt="" className='w-16 h-16 block mb-6'/>
            <h2 className='text-xl font-medium mb-6'>
                К сожалению, мы не смогли ничего найти по запросу{' '}
                <span className={classNames(style.blue)}>“{value}”</span>
            </h2>
            <p className={classNames('mb-2 font-semibold', style.paragraph)}>
                Попробуйте оптимизировать ваш поиск. Вот несколько предложений:
            </p>
            <ul className={classNames('list-disc pl-4', style.list)}>
                <li className=''>Убедитесь, что все слова написаны правильно</li>
                <li>Попробуйте ввести другие поисковые запросы</li>
                <li>Попробуйте использовать более общие поисковые запросы</li>
            </ul>
        </div>
    );
};
