import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import style from './Learn.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { BlockOption } from './utils';
import Skeleton from 'react-loading-skeleton';
import {
    useGetAllSubjectsQuery,
    useLazyGetAllSectionsQuery,
    useLazyGetAllSubjectsQuery,
} from '../../api/authService';
import { BlockOptionSubject } from './utils/BlockOptionSubject';

interface ILearn {
    className: string;
}

export const Learn: React.FC<ILearn> = ({ className, ...props }) => {
    const { data: subjects } = useGetAllSubjectsQuery({ limit: 100 });
    const [currentSubject, setCurrentSubject] = useState<string>('');
    const [currentChapters, setCurrentChapters] = useState<string>('');
    const [currentSection, setCurrentSections] = useState<string>('');

    const { t } = useTranslation();

    const [getChapters, { data: chapters, isFetching: isFetchingChapters }] =
        useLazyGetAllSectionsQuery();

    const [getSections, { data: sections, isFetching: isFetchingSections }] =
        useLazyGetAllSectionsQuery();

    const [getTopics, { data: topics, isFetching: isFetchingTopics }] =
        useLazyGetAllSectionsQuery();

    const handleClickSubject = (id: string) => {
        setCurrentSubject(id);
        setCurrentChapters('');
        setCurrentSections('');
    };

    const handleClickChapters = (id: string) => {
        setCurrentChapters(id);
        setCurrentSections('');
    };

    const handleClickSection = (id: string) => {
        setCurrentSections(id);
    };

    useEffect(() => {
        if (currentSubject !== '') {
            getChapters({ subject_id: Number(currentSubject), type_id: 1 });
        }
    }, [currentSubject]);

    useEffect(() => {
        if (currentChapters !== '') {
            getSections({
                parent_id: Number(currentChapters),
                subject_id: Number(currentSubject),
                type_id: 2,
            });
        }
    }, [currentChapters]);

    useEffect(() => {
        if (currentSection !== '') {
            getTopics({
                parent_id: Number(currentSection),
                subject_id: Number(currentSubject),
                type_id: 3,
            });
        }
    }, [currentSection]);

    console.log('isFetchingSections', isFetchingSections);

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
                    <BlockOptionSubject
                        title="Предмет"
                        data={subjects}
                        active={currentSubject}
                        handleChange={id => {
                            handleClickSubject(id);
                        }}
                    />
                    {currentSubject !== '' && (
                        <BlockOption
                            title="Главы"
                            data={chapters}
                            isLoading={isFetchingChapters}
                            handleChange={id => {
                                handleClickChapters(id);
                            }}
                            active={currentChapters}
                        />
                    )}

                    {currentChapters !== '' && (
                        <BlockOption
                            title="Разделы"
                            handleChange={id => {
                                handleClickSection(id);
                            }}
                            isLoading={isFetchingSections}
                            active={currentSection}
                            data={sections}
                        />
                    )}

                    {currentSection !== '' && (
                        <BlockOption
                            isLoading={isFetchingTopics}
                            title="Темы"
                            data={topics}
                        />
                    )}
                </aside>
            </Tooltip>
        </>
    );
};
