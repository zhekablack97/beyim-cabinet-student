import React from 'react';
import { Tooltip } from 'react-tooltip';
import style from './Learn.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BlockOption } from './utils';
import { useGetAllSubjectsQuery } from '../../api/authService';

interface ILearn {
    className: string;
}

export const Learn: React.FC<ILearn> = ({ className, ...props }) => {
    const { data: subject } = useGetAllSubjectsQuery({ limit: 100 });
    const { t } = useTranslation();

    return (
        <>
            <button
                className={classNames(className, style.learn)}
                data-tooltip-id="learn"
                {...props}
            >
                {t('header.learn')}
            </button>
            <Tooltip
                openOnClick={true}
                clickable={true}
                noArrow={true}
                opacity={1}
                id="learn"
                className={style.wrapperTooltip}
            >
                <aside className="flex rounded-2xl">
                    <BlockOption title="Предмет" data={subject} />
                    <BlockOption title="Главы" />
                    <BlockOption title="Разделы" />
                    <BlockOption title="Темы" />
                </aside>
            </Tooltip>
        </>
    );
};
