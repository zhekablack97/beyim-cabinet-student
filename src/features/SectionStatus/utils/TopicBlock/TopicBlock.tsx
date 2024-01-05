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
import { useGetAnswerQuery } from '../../../../api/beyimProgress';
import { Link } from 'react-scroll';

interface ITopicBlock {
    item: Children;
}

export const TopicBlock: React.FC<ITopicBlock> = ({ item, ...props }) => {
    const { i18n } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const [searchParams, setSearchParams] = useSearchParams();
    const [sectionId, setSectionId] = useState<string>('');
    const [allActivity, setAllActivity] = useState<string[] | undefined>([]);

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

    const dataMicrotopicIds =
        dataCustomFeed?.data.data !== null
            ? dataCustomFeed?.data.data
                ? dataCustomFeed?.data.data
                : []
            : [];

    const { data: answer } = useGetAnswerQuery({
        microtopicIds:
            dataMicrotopicIds
                .filter(item => item.category === 'activity')
                .map(activity => activity.microtopicId) || [],
    });

    // Function to handle the activation of a link.
    const handleSetActive = (activity: string) => {
        setSearchParams(prev => {
            return {
                idContent: prev.get('idContent') || '',
                fromSearch: prev.get('fromSearch') || '',
                subject: prev.get('subject') || '',
                sectionsBySubject: prev.get('sectionsBySubject') || '',
                them: String(item.id || ''),
                idActivity: activity,
            };
        });
    };

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

    useEffect(() => {
        if (dataCustomFeed) {
            const data =
                dataCustomFeed?.data.data !== null
                    ? dataCustomFeed?.data.data
                    : [];
            setAllActivity(
                data
                    .filter(post => post.category === 'activity')
                    .map(
                        element =>
                            element.activities?.map(activity => activity.id),
                    )
                    .reduce((accumulate, current) => {
                        if (current) {
                            return accumulate?.concat(current);
                        }
                    }, []),
            );
        }
    }, [dataCustomFeed]);

    const trueActivity = answer?.data.answers
        ?.filter(answer => answer.is_correct)
        .filter(answerFilter => allActivity?.indexOf(answerFilter.id) !== -1)
        .length;

    const percent = ((trueActivity || 0) / (allActivity?.length || 1)) * 100;

    return (
        <button
            {...props}
            className={classNames(
                'rounded-xl px-4 py-3 border-2 flex flex-col',
                style.wrapper,
                sectionId === String(item.id) && style.active,
            )}
            onClick={
                !(sectionId === String(item.id))
                    ? () => {
                          setSearchParams(prev => {
                              return {
                                  idContent: prev.get('idContent') || '',
                                  fromSearch: prev.get('fromSearch') || '',
                                  subject: prev.get('subject') || '',
                                  sectionsBySubject:
                                      prev.get('sectionsBySubject') || '',
                                  them: String(item.id || ''),
                              };
                          });
                      }
                    : undefined
            }
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
                    <div className="flex items-center">
                        <span
                            className={classNames(
                                style.percentage,
                                'text-sm font-medium mr-2 leading-6',
                            )}
                        >
                            Выполнено {Math.round(percent)} %
                        </span>
                        <div
                            className="flex gap-1 items-center"
                            onClick={e => {
                                e.preventDefault();
                            }}
                        >
                            {allActivity?.map(activity => {
                                const isCorrect =
                                    answer?.data.answers?.find(
                                        (answer: { id: string }) =>
                                            answer.id === activity,
                                    )?.is_correct || false;

                                return (
                                    <Link
                                        key={`${activity}-activity`}
                                        activeClass="active"
                                        to={activity}
                                        spy={true}
                                        smooth={true}
                                        offset={-250}
                                        duration={300}
                                    >
                                        <img
                                            src={`/icons/solar_star${
                                                isCorrect ? '' : '-gray'
                                            }.svg`}
                                            alt=""
                                            onClick={() => {
                                                handleSetActive(activity);
                                            }}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </button>
    );
};
