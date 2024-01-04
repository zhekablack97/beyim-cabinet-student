import { useTranslation } from 'react-i18next';
import ScrollContainer from 'react-indiana-drag-scroll';
import style from './SubjectsFilter.module.scss';
import classNames from 'classnames';
import { Button } from './utils';
import { useState } from 'react';
import { useGetAllSubjectsQuery } from '../../api';
import { useSearchParams } from 'react-router-dom';

interface ISubjectsFilter {}

export const SubjectsFilter: React.FC<ISubjectsFilter> = ({ ...props }) => {
    const { t, i18n } = useTranslation();
    const { data: subjects, isFetching: isFetchingSubjects } =
        useGetAllSubjectsQuery({ limit: 100 });

    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const onChangeSubject = (id?: string) => {
        setSearchParams(prev => {
            return {
                idContent: prev.get('contentId') || '',
                fromSearch: prev.get('fromSearch') || '',
                subject: id || '',
                sectionsBySubject: '',
                them: '',
            };
        });
    };
    return (
        <div
            className={classNames(
                style.wrapper,
                'overflow-hidden rounded-2xl h-24  shadow-xl',
            )}
            {...props}
        >
            <ScrollContainer>
                <div className="flex px-2">
                    <Button
                        imgSrc="/icons/allFeed.svg"
                        name={t('feed.allFeed')}
                        isActive={
                            searchParams.get('subject') === '' ? true : false
                        }
                        onClick={() => {
                            onChangeSubject('');
                        }}
                    />
                    {subjects?.data.subjects.map(item => {
                        return (
                            <Button
                                key={item.id}
                                imgSrc={item.icon_url}
                                isActive={
                                    searchParams.get('subject') ===
                                    String(item.id)
                                        ? true
                                        : false
                                }
                                name={
                                    item.translations.find(
                                        lang => lang.locale === locale,
                                    )?.name
                                }
                                onClick={() => {
                                    onChangeSubject(String(item.id));
                                }}
                            />
                        );
                    })}
                </div>
            </ScrollContainer>
        </div>
    );
};
