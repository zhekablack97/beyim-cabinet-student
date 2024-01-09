import React from 'react';
import style from '../AssessmentBlocks.module.scss';
import {
    AssessmentMetricsData,
    AssessmentState,
} from '../AssessmentStartingBlock/AssessmentStartingBlock';
import { useTranslation } from 'react-i18next';

type Props = { metricsData: AssessmentMetricsData; state: AssessmentState };

const MetricWrapper = ({ children, state }: any) => {
    return (
        <div
            className={`${style[`metricWrapper`]} ${
                state !== 'default' && style[`bgWhite`]
            }`}
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
        <div className={style.info}>
            <MetricWrapper state={state}>
                <img
                    src={
                        state === 'default'
                            ? '/icons/iconamoon_lightning-1-fill.svg'
                            : state === 'fail'
                              ? '/icons/iconamoon_lightning-1-fill-fail.svg'
                              : '/icons/iconamoon_lightning-1-fill-successs.svg'
                    }
                    alt=""
                />

                <div>
                    <span className={style[`color-${state}`]}>
                        {state !== 'default'
                            ? t('assessment.pointsEarned')
                            : t('assessment.treshold')}
                    </span>
                    <span>{metricsData.points}%</span>
                </div>
            </MetricWrapper>
            <MetricWrapper state={state}>
                <img
                    src={
                        state === 'default'
                            ? '/icons/fluent_question-circle-24-filled.svg'
                            : state === 'fail'
                              ? '/icons/fluent_question-circle-24-filled-fail.svg'
                              : '/icons/fluent_question-circle-24-filled-green.svg'
                    }
                    alt=""
                />

                <div>
                    <span className={style[`color-${state}`]}>
                        {state !== 'default'
                            ? t('assessment.correctAnswersCount')
                            : t('assessment.totalQuestionsCount')}
                    </span>
                    <span>
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
                    src={
                        state === 'default'
                            ? '/icons/ic_round-access-time-filled.svg'
                            : state === 'fail'
                              ? '/icons/ic_round-access-time-filled-fail.svg'
                              : '/icons/ic_round-access-time-filled-green.svg'
                    }
                    alt=""
                />
                <div>
                    <span className={style[`color-${state}`]}>
                        {state !== 'default'
                            ? t('assessment.completedAt')
                            : t('assessment.duration')}
                    </span>
                    <span>
                        {metricsData.time} {t('assessment.minutes')}
                    </span>
                </div>
            </MetricWrapper>
        </div>
    );
};
