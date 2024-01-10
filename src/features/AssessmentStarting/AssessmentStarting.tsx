import classNames from 'classnames';
import { useGetAssessmentInfoQuery } from '../../api/beyimAssessmentApi';
import style from './AssessmentStarting.module.scss';
import { useTranslation } from 'react-i18next';
import { AssessmentBlockMetricsSection } from './AssessmentBlockMetricsSection';
import { Link, useSearchParams } from 'react-router-dom';
import { Locale } from '../../types/common';

export const AssessmentStarting: React.FC = () => {
    const [searchParams] = useSearchParams();

    const { t, i18n } = useTranslation();

    const { data: assessmentInfo } = useGetAssessmentInfoQuery({
        locale: i18n.language as Locale,
        section_id: Number(searchParams.get('them')) ?? null,
        subject_id: Number(searchParams.get('subject')) ?? null,
    });
    const state = assessmentInfo?.data.assessment.progress
        ? assessmentInfo?.data.assessment.progress.percentage >=
          assessmentInfo?.data.assessment.threshold
            ? 'success'
            : 'fail'
        : 'default';
    const metricsData = {
        points:
            (assessmentInfo?.data.assessment.progress
                ? assessmentInfo.data.assessment.progress.percentage
                : assessmentInfo?.data.assessment.threshold) ?? 0,
        questionsCount: {
            correct: assessmentInfo?.data?.assessment?.progress?.score ?? 0,
            total: assessmentInfo?.data?.assessment?.question_count,
        },
        time:
            (assessmentInfo?.data.assessment.progress
                ? assessmentInfo.data.assessment.progress.duration
                : assessmentInfo?.data?.assessment?.duration) ?? 0,
    };

    return assessmentInfo?.success ? (
        <article
            className={classNames(
                'rounded-2xl flex flex-col gap-4 pl-4 pr-4 pt-6 pb-4',
                style.wrapper,
                style[state],
            )}
        >
            <header id="step-7" className="flex items-center">
                <div className="w-full max-w-full overflow-hidden">
                    <span
                        className={classNames(
                            style.type,
                            'text-sm font-medium max-w-full overflow-hidden text-nowrap block whitespace-nowrap text-ellipsis',
                            style[`color-${state}`],
                        )}
                    >
                        {t('assessment.header')}{' '}
                        {assessmentInfo?.data.assessment.section_type_id === 3
                            ? t('assessment.type.topic')
                            : t('assessment.type.section')}
                        :
                    </span>
                    <h3
                        className={classNames(
                            'font-bold text-lg m-0',
                            style.title,
                        )}
                    >
                        {assessmentInfo?.data.assessment.section_name}
                    </h3>
                </div>
            </header>
            <AssessmentBlockMetricsSection
                metricsData={metricsData}
                state={state}
            />
            <footer id="step-12">
                <Link
                    className={classNames(
                        style[`button-info`],
                        'w-full cursor-pointer rounded-2xl font-semibold block text-center text-sm ',
                    )}
                    to=""
                >
                    {t('assessment.examine')}
                </Link>
            </footer>
        </article>
    ) : null;
};
