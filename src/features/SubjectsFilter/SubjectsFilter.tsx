import { useTranslation } from 'react-i18next';
import ScrollContainer from 'react-indiana-drag-scroll';
import style from './SubjectsFilter.module.scss';
import classNames from 'classnames';
import { Button } from './utils';
import { useState } from 'react';
import { useGetAllSubjectsQuery } from '../../api';

interface ISubjectsFilter {
    currentFeed?: string;
}

export const SubjectsFilter: React.FC<ISubjectsFilter> = ({
    currentFeed = '',
}) => {
    const { t, i18n } = useTranslation();
    const { data: subjects, isFetching: isFetchingSubjects } =
        useGetAllSubjectsQuery({ limit: 100 });

    const [currentActive, setCurrentActive] = useState<string>(currentFeed);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    return (
        <div
            className={classNames(
                style.wrapper,
                'overflow-hidden rounded-2xl h-24 mt-3',
            )}
        >
            <ScrollContainer>
                <div className="flex px-2">
                    <Button
                        imgSrc="/icons/allFeed.svg"
                        name={t('feed.allFeed')}
                        isActive={currentActive === '' ? true : false}
                        onClick={() => {
                            setCurrentActive('');
                        }}
                    />
                    {subjects?.data.subjects.map(item => {
                        return (
                            <Button
                                key={item.id}
                                imgSrc={item.icon_url}
                                isActive={
                                    currentActive === String(item.id)
                                        ? true
                                        : false
                                }
                                name={
                                    item.translations.find(
                                        lang => lang.locale === locale,
                                    )?.name
                                }
                                onClick={() => {
                                    setCurrentActive(String(item.id));
                                }}
                            />
                        );
                    })}
                </div>
            </ScrollContainer>
        </div>
    );
};
