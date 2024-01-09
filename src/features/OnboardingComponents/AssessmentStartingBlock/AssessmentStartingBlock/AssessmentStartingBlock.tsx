import React from 'react';
import style from '../AssessmentBlocks.module.scss';

import { useTranslation } from 'react-i18next';
import { AssessmentBlockMetricsSection } from '../AssessmentBlockMetricsSection/AssessmentBlockMetricsSection';
import { AssessmentBlockFooter } from '../AssessmentBlockFooter/AssessmentBlockFooter';

type AssessmenType = 'section' | 'topic';

export type AssessmentState = 'default' | 'success' | 'fail';

export type AssessmentMetricsData = {
    points: number;
    questionsCount: { correct?: number; total: number };
    time: number;
};

interface Props {
    currentStep?: number;
    activeAssessment?: string;
    assessmentType: AssessmenType;
    title: string;
    state?: AssessmentState;
    metricsData: AssessmentMetricsData;
    footer: React.ReactNode;
    pointerNone?: string;
}

export const AssessmentStartingBlock = ({
    assessmentType = 'section',
    title = 'AssessmentStartingBlock',
    state = 'default',
    metricsData = {
        points: 50,
        questionsCount: {
            total: 12,
        },
        time: 40,
    },
    footer,
    currentStep,
    activeAssessment,
    pointerNone,
}: Props) => {
    const { t } = useTranslation();
    return (
        <article
            className={`${style.post} ${style.test} ${style.done} ${
                style[state]
            } ${currentStep === 12 || currentStep === 13 ? 'z-210' : ''} ${
                currentStep && pointerNone
            }`}
            data-tooltip-id={activeAssessment}
        >
            <header id="step-7" className={` ${style['post-header']}`}>
                <div className={style['post-title']}>
                    <span className={style[`color-${state}`]}>
                        {t('assessment.header')}{' '}
                        {assessmentType === 'section'
                            ? t('assessment.type.section')
                            : t('assessment.type.topic')}
                        :
                    </span>
                    <h3>{title}</h3>
                </div>
            </header>
            <AssessmentBlockMetricsSection
                metricsData={metricsData}
                state={state}
            />

            <AssessmentBlockFooter>{footer}</AssessmentBlockFooter>
        </article>
    );
};
