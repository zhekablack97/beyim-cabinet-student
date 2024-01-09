import { useTranslation } from 'react-i18next';
import { Section } from '../../types/GetSectionBySubjectsApiResponseApiType';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import style from './SectionStatus.module.scss';
import { TopicBlock } from './utils';
import { SectionBlock } from './utils/SectionBlock';
import { GetAnswerResponseApiType } from '../../types';

interface ISectionStatus {
    data: Section[];
}

export const SectionStatus: React.FC<ISectionStatus> = ({ data, ...rest }) => {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const [indexSectionsBySubject, setIndexSectionsBySubject] =
        useState<number>(
            data.findIndex(
                item =>
                    String(item.id) === searchParams.get('sectionsBySubject'),
            ) !== -1
                ? data.findIndex(
                      item =>
                          String(item.id) ===
                          searchParams.get('sectionsBySubject'),
                  )
                : 0,
        );

    useEffect(() => {
        setIndexSectionsBySubject(
            data.findIndex(
                item =>
                    String(item.id) === searchParams.get('sectionsBySubject'),
            ) !== -1
                ? data.findIndex(
                      item =>
                          String(item.id) ===
                          searchParams.get('sectionsBySubject'),
                  )
                : 0,
        );
    }, [
        data.findIndex(
            item => String(item.id) === searchParams.get('sectionsBySubject'),
        ),
    ]);

    const nextSection = () => {
        if (
            indexSectionsBySubject + 1 !== data.length &&
            data[indexSectionsBySubject + 1].children[0]
        ) {
            setSearchParams(prev => {
                return {
                    idContent: prev.get('idContent') || '',
                    fromSearch: prev.get('fromSearch') || '',
                    subject: prev.get('subject') || '',
                    sectionsBySubject: String(
                        data[indexSectionsBySubject + 1].id || '',
                    ),
                    them: '',
                };
            });
        }
    };

    const prevSection = () => {
        if (indexSectionsBySubject !== 0) {
            setSearchParams(prev => {
                return {
                    idContent: prev.get('idContent') || '',
                    fromSearch: prev.get('fromSearch') || '',
                    subject: prev.get('subject') || '',
                    sectionsBySubject: String(
                        data[indexSectionsBySubject - 1].id || '',
                    ),
                    them: '',
                };
            });
        }
    };

    return (
        <div
            {...rest}
            className={classNames(
                'p-4 rounded-2xl sticky top-[181px]',
                style.wrapper,
            )}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h2
                        className={classNames(
                            style.section,
                            'text-sm font-medium',
                        )}
                    >
                        Раздел
                    </h2>

                    {data.map((item, index) => {
                        return (
                            <SectionBlock
                                item={item}
                                key={item.id}
                                isHidden={!(indexSectionsBySubject === index)}
                            />
                        );
                    })}
                </div>
                <div className="flex grow-0 shrink-0 gap-2">
                    <button
                        type="button"
                        className={classNames(
                            'border-2 w-8 h-8 flex items-center justify-center rounded-[10.7px]',
                            style.borderButton,
                            indexSectionsBySubject !== 0 ? '' : 'opacity-50',
                        )}
                        onClick={prevSection}
                        disabled={!(indexSectionsBySubject !== 0)}
                    >
                        <img
                            src="/icons/buttonNext.svg"
                            className="rotate-180 block"
                            alt=""
                        />
                    </button>
                    <button
                        className={classNames(
                            'border-2 w-8 h-8 flex items-center justify-center rounded-[10.7px]',
                            style.borderButton,
                            indexSectionsBySubject + 1 !== data.length &&
                                data[indexSectionsBySubject + 1]?.children &&
                                data[indexSectionsBySubject + 1]?.children[0]
                                ? ''
                                : 'opacity-50',
                        )}
                        onClick={nextSection}
                        disabled={
                            !(
                                indexSectionsBySubject + 1 !== data.length &&
                                data[indexSectionsBySubject + 1]?.children &&
                                data[indexSectionsBySubject + 1]?.children[0]
                            )
                        }
                    >
                        <img
                            src="/icons/buttonNext.svg"
                            className=" block"
                            alt=""
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {data[indexSectionsBySubject]?.children?.map(item => {
                    return <TopicBlock item={item} key={item.id} />;
                })}
            </div>
        </div>
    );
};
