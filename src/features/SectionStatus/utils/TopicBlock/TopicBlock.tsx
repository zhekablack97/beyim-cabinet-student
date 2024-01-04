import { useSearchParams } from 'react-router-dom';
import { Children } from '../../../../types/GetSectionBySubjectsApiResponseApiType';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
    useGetFeedMicrotopicsQuery,
    useGetSectionsBySubjectQuery,
} from '../../../../api/programService';
import classNames from 'classnames';
import style from './TopicBlock.module.scss';
import { GetAnswerResponseApiType } from '../../../../types';
import { useGetCustomFeedQuery } from '../../../../api/contentService';

interface ITopicBlock {
    item: Children;
    dataAllActivity?: string[];
    answer?: GetAnswerResponseApiType;
}

export const TopicBlock: React.FC<ITopicBlock> = ({
    dataAllActivity = [],
    item,
    answer,
    ...props
}) => {
    const { i18n } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const [searchParams, setSearchParams] = useSearchParams();
    const [sectionId, setSectionId] = useState<string>('');

    const { data: dataSectionsBySubject } = useGetSectionsBySubjectQuery({
        subject_id: searchParams.get('subject') || '',
        limit: 100,
    });

    const { data: dataFeedMicrotopics } = useGetFeedMicrotopicsQuery({
        section_id: sectionId,
        limit: 100,
    });

    const { data: dataCustomFeed } = useGetCustomFeedQuery({
        microtopicIds: dataFeedMicrotopics?.data.result.ids || [],
        locale,
    });

    useEffect(() => {
        setSectionId(
            String(
                searchParams.get('them') ||
                    dataSectionsBySubject?.data.sections.find(section => {
                        return (
                            String(section.id) ===
                            searchParams.get('sectionsBySubject')
                        );
                    })?.children[0]?.id ||
                    dataSectionsBySubject?.data.sections[0]?.children[0]?.id ||
                    '',
            ),
        );
    }, [
        searchParams.get('them'), //тема из урла
        dataSectionsBySubject?.data.sections.find(section => {
            return String(section.id) === searchParams.get('sectionsBySubject');
        })?.children[0]?.id, //выбор темы из активной секции
        dataSectionsBySubject?.data.sections[0]?.children[0]?.id, //выбор самой первой доступной темы
    ]);

    return (
        <button
            {...props}
            className={classNames(
                'rounded-xl px-4 py-3 border-2 flex flex-col',
                style.wrapper,
                sectionId === String(item.id) && style.active,
            )}
            onClick={() => {
                setSearchParams(prev => {
                    return {
                        idContent: prev.get('idContent') || '',
                        fromSearch: prev.get('fromSearch') || '',
                        subject: prev.get('subject') || '',
                        sectionsBySubject: prev.get('sectionsBySubject') || '',
                        them: String(item.id || ''),
                    };
                });
            }}
        >
            <div>
                <h4 className="text-sm font-bold block">
                    {
                        item.translations.find(translation => {
                            return translation.locale === locale;
                        })?.name
                    }
                </h4>
                <img src="" alt="" />
            </div>
            {sectionId === String(item.id) && (
                <div className="w-full">
                    <hr className="h-[2px] my-2" />
                    <div className="flex">
                        <span
                            className={classNames(
                                style.percentage,
                                'text-sm font-medium',
                            )}
                        >
                            Выполнено 25%
                        </span>
                        {dataAllActivity?.map(item => {
                            const isCorrect =
                                answer?.data.answers?.find(
                                    (answer: { id: string }) =>
                                        answer.id === item,
                                )?.is_correct || false;

                            return (
                                <div key={item}>
                                    <img
                                        src={`/icons/solar_star${
                                            isCorrect ? '' : '-gray'
                                        }.svg`}
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </button>
    );
};
