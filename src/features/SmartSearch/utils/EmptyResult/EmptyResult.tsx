import React from 'react';
import style from './EmptyResult.module.scss';

export const EmptyResult: React.FC = () => {
    return (
        <div className="col-span-8 col-start-3 flex gap-4 flex-col">
            Нету результатов по этому запросу{' '}
        </div>
    );
};
