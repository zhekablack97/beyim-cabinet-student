import { useTranslation } from 'react-i18next';
import { Section } from '../../types/GetSectionBySubjectsApiResponseApiType';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import style from './SectionStatus.module.scss';

interface ISectionStatus {
    data: Section[];
}

export const SectionStatus: React.FC<ISectionStatus> = ({ data, ...rest }) => {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const indexSectionsBySubject =
        data.findIndex(
            item => String(item.id) === searchParams.get('sectionsBySubject'),
        ) !== -1
            ? data.findIndex(
                  item =>
                      String(item.id) === searchParams.get('sectionsBySubject'),
              )
            : 0;

    console.log(indexSectionsBySubject, 'indexSectionsBySubject');
    const nextSection = () => {
        if (
            indexSectionsBySubject + 1 !== data.length &&
            data[indexSectionsBySubject + 1].children[0]
        ) {
            console.log(data, 'data');
            console.log(
                data[indexSectionsBySubject + 1].children[0],
                'Следующий',
            );
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
            <span>
                <h2 className={classNames(style.section, 'text-sm')}>Раздел</h2>
            </span>
            {data.map((item, index) => {
                return (
                    <div key={item.id}>
                        <button
                            className={classNames(
                                style.nameSection,
                                indexSectionsBySubject === index ? '' : 'hidden',

                                'mb-3',
                            )}
                            onClick={() => {
                                setSearchParams(prev => {
                                    return {
                                        idContent: prev.get('idContent') || '',
                                        fromSearch:
                                            prev.get('fromSearch') || '',
                                        subject: prev.get('subject') || '',
                                        sectionsBySubject:
                                            String(item.id) || '',
                                        them: '',
                                    };
                                });
                            }}
                        >
                            <span
                                className={classNames(
                                    'font-semibold',
                                    style.nameSection,
                                )}
                            >
                                {
                                    item.translations.find(translation => {
                                        return translation.locale === locale;
                                    })?.name
                                }
                            </span>
                        </button>
                    </div>
                );
            })}
            <button onClick={prevSection}>прошлый раздел</button>|||
            <button onClick={nextSection}>следующий раздел</button>
            {data[indexSectionsBySubject]?.children?.map(item => {
                return (
                    <button
                        key={item.id}
                        className="h-20"
                        onClick={() => {
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
                        }}
                    >
                        {
                            item.translations.find(translation => {
                                return translation.locale === locale;
                            })?.name
                        }
                    </button>
                );
            })}
        </div>
    );
};
