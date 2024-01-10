import React from 'react';
import style from './AssessmentBlockMetricsSection.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

type Props = {
    metricsData: {
        points: number;
        questionsCount: { correct?: number; total: number | undefined };
        time: number;
    };
    state: 'default' | 'success' | 'fail';
};

const MetricWrapper = ({
    children,
    state,
}: {
    children: React.ReactNode;
    state: 'default' | 'success' | 'fail';
}) => {
    return (
        <div
            className={classNames(
                `flex p-2 flex-row gap-2 rounded-2xl w-full`,
                style.metricWrapper,
                state !== 'default' && style[`bgWhite`],
            )}
        >
            {children}
        </div>
    );
};

export const AssessmentBlockMetricsSection = ({
    metricsData,
    state,
}: Props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-2 sm:justify-between sm:gap-x-2 sm:flex-row ">
            <MetricWrapper state={state}>
                <img
                    className="w-6 h-6"
                    src={
                        state === 'default'
                            ? '/icons/iconamoon_lightning-1-fill.svg'
                            : state === 'fail'
                              ? '/icons/iconamoon_lightning-1-fill-fail.svg'
                              : '/icons/iconamoon_lightning-1-fill-successs.svg'
                    }
                    alt=""
                />

                <div className="flex flex-col gap-y-1">
                    <span
                        className={classNames(
                            style.time,
                            'font-medium text-sm',
                            style[`color-${state}`],
                        )}
                    >
                        {state !== 'default'
                            ? t('assessment.pointsEarned')
                            : t('assessment.treshold')}
                    </span>
                    <span
                        className={classNames(
                            style.minutes,
                            'text-base font-semibold',
                        )}
                    >
                        {metricsData.points}%
                    </span>
                </div>
            </MetricWrapper>
            <MetricWrapper state={state}>
                <img
                    className="w-6 h-6"
                    src={
                        state === 'default'
                            ? '/icons/fluent_question-circle-24-filled.svg'
                            : state === 'fail'
                              ? '/icons/fluent_question-circle-24-filled-fail.svg'
                              : '/icons/fluent_question-circle-24-filled-green.svg'
                    }
                    alt=""
                />

                <div className="flex flex-col gap-y-1">
                    <span
                        className={classNames(
                            style.time,
                            'text-sm font-medium',
                            style[`color-${state}`],
                        )}
                    >
                        {state !== 'default'
                            ? t('assessment.correctAnswersCount')
                            : t('assessment.totalQuestionsCount')}
                    </span>
                    <span
                        className={classNames(
                            style.minutes,
                            'text-base font-semibold',
                        )}
                    >
                        {state !== 'default' &&
                            `${metricsData.questionsCount.correct} ${t(
                                'assessment.outOf',
                            )} `}
                        {metricsData.questionsCount.total}
                    </span>
                </div>
            </MetricWrapper>
            <MetricWrapper state={state}>
                <img
                    className="w-6 h-6"
                    src={
                        state === 'default'
                            ? '/icons/ic_round-access-time-filled.svg'
                            : state === 'fail'
                              ? '/icons/ic_round-access-time-filled-fail.svg'
                              : '/icons/ic_round-access-time-filled-green.svg'
                    }
                    alt=""
                />
                <div className="flex flex-col gap-y-1">
                    <span
                        className={classNames(
                            style.time,
                            'text-sm font-medium',
                            style[`color-${state}`],
                        )}
                    >
                        {state !== 'default'
                            ? t('assessment.completedAt')
                            : t('assessment.duration')}
                    </span>
                    <span
                        className={classNames(
                            style.minutes,
                            'text-base font-semibold',
                        )}
                    >
                        {metricsData.time} {t('assessment.minutes')}
                    </span>
                </div>
            </MetricWrapper>
        </div>
    );
};
