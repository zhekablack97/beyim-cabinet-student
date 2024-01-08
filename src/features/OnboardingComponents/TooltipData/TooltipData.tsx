// Your translation file

import { useTranslation } from 'react-i18next';
import style from './TooltipData.module.scss';
import { getData } from '../utils/data';

interface ITooltipData {
    activeActivity: string;
    activeAssessment: string;
    currentStep: number;
}

export const getTranslatedTooltipContent = ({
    activeActivity,
    activeAssessment,
    currentStep,
}: ITooltipData) => {
    const { t } = useTranslation();
    const data = getData();
    const tooltipData = [
        {
            currrenSection: 1,
            id: '1',
            place: 'left-start',
            content: (
                <div className={style.onBoarding}>
                    <span>1 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step1.title')}</h2>
                    <p>{t('onboarding.step1.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transformY12,
            classArrow: style.arrow1,
        },
        {
            currrenSection: 1,
            id: '2',
            place: 'left-start',
            offset: 26,
            content: (
                <div className={style.onBoarding}>
                    <span>1 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step2.title')}</h2>
                    <p>{t('onboarding.step2.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform22Y,
            classArrow: style.arrow2,
        },
        {
            currrenSection: 1,
            id: '3',
            place: 'bottom',
            content: (
                <div className={style.onBoarding}>
                    <span>1 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step3.title')}</h2>
                    <p>{t('onboarding.step3.paragraph')}</p>
                </div>
            ),
        },
        {
            currrenSection: 1,
            id: '4',
            place: 'left-start',
            content: (
                <div className={style.onBoarding}>
                    <span>1 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step4.title')}</h2>
                    <p>{t('onboarding.step4.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform14,
            classArrow: style.arrow5,
        },
        {
            currrenSection: 2,
            id: '5',
            place: 'left',
            content: (
                <div className={style.onBoarding}>
                    <span>2 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step5.title')}</h2>
                    <p>{t('onboarding.step5.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform17,
            classArrow: style.arrow7,
        },
        {
            currrenSection: 2,
            id: '6',
            place: 'right',
            content: (
                <div className={style.onBoarding}>
                    <span>2 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step6.title')}</h2>
                    <p>{t('onboarding.step6.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform18,
            classArrow: style.arrow7,
        },
        {
            currrenSection: 3,
            id: '7',
            place: 'right-start',
            content: (
                <div className={style.onBoarding}>
                    <span>3 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step7.title')}</h2>
                    <p>{t('onboarding.step7.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform19,
            classArrow: style.arrow1,
        },
        {
            currrenSection: 3,
            id: '8',
            place: 'right',
            content: (
                <div className={style.onBoarding}>
                    <span>3 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step8.title')}</h2>
                    <p>{t('onboarding.step8.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform26,
            classArrow: style.arrow8,
            offset: 26,
        },
        {
            currrenSection: 3,
            id: '9',
            place: 'right',
            content: (
                <div className={style.onBoarding}>
                    <span>3 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step9.title')}</h2>
                    <p>{t('onboarding.step9.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform27,
            classArrow: style.arrow1,
            offset: 26,
        },
        {
            currrenSection: 3,
            id: activeActivity || '10',
            place: 'right',
            content: (
                <div className={style.onBoarding}>
                    <span>3 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step1011.title')}</h2>
                    <p>
                        {t('onboarding.step1011.paragraph')}
                        <div
                            className="flex"
                            style={{
                                gap: '8px',
                                marginTop: '8px',
                            }}
                        >
                            {currentStep === 10 &&
                                data.star.slice(0, 3).map((item: any) => (
                                    <div key={item}>
                                        <img src={item} alt="" />
                                    </div>
                                ))}
                            {currentStep === 11 &&
                                data.starActive.slice(0, 3).map((item: any) => (
                                    <div key={item}>
                                        <img src={item} alt="" />
                                    </div>
                                ))}
                        </div>
                    </p>
                </div>
            ),
            classNameTooltip: style.transform26,
            classArrow: style.arrow2,
            offset: 26,
        },
        {
            currrenSection: 4,
            id: activeAssessment || '12',
            place: 'right',
            content: (
                <div className={style.onBoarding}>
                    <span>4 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step12.title')}</h2>
                    <p>
                        {t('onboarding.step12.paragraph')}
                        <img
                            src={
                                currentStep === 12
                                    ? '/static/icons/lightning.svg'
                                    : '/static/icons/lightningActive.svg'
                            }
                            alt="star"
                            style={{
                                marginTop: '8px',
                                width: '24px',
                                height: '24px',
                            }}
                        />
                    </p>
                </div>
            ),
            classNameTooltip: style.transform25,
            classArrow: style.arrow2,
        },
        {
            currrenSection: 5,
            id: '14',
            place: 'left-start',
            content: (
                <div className={style.onBoarding}>
                    <span>5 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step14.title')}</h2>
                    <p>{t('onboarding.step14.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform16,
            classArrow: style.arrow4,
            offset: 26,
        },
        {
            currrenSection: 5,
            id: '15',
            place: 'left',
            content: (
                <div className={style.onBoarding}>
                    <span>5 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step15.title')}</h2>
                    <p>{t('onboarding.step15.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform23,
            classArrow: style.arrow8,
        },
        {
            currrenSection: 5,
            id: '16',
            place: 'left',
            content: (
                <div className={style.onBoarding}>
                    <span>5 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step16.title')}</h2>
                    <p>
                        {t('onboarding.step16.paragraph')}
                        <img
                            src={'/static/icons/lightningActive.svg'}
                            alt="star"
                            style={{
                                width: '24px',
                                height: '24px',
                                marginTop: '8px',
                            }}
                        />
                    </p>
                </div>
            ),
            classNameTooltip: style.transform24,
            classArrow: style.arrow8,
        },
        {
            currrenSection: 5,
            id: '17',
            place: 'left',
            content: (
                <div className={style.onBoarding}>
                    <span>5 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step17.title')}</h2>
                    <p>{t('onboarding.step17.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform22,
            classArrow: style.arrow4,
        },
        {
            currrenSection: 5,
            id: '18',
            place: 'left',
            content: (
                <div className={style.onBoarding}>
                    <span>5 {t('onboarding.outOf')} 5</span>
                    <h2>{t('onboarding.step18.title')}</h2>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {data.allStar.map((item: any) => (
                            <div
                                key={item}
                                style={{
                                    background: '#ECFCE4',
                                    padding: '3px',
                                }}
                            >
                                <img src={item} alt="" width={18} height={18} />
                            </div>
                        ))}
                    </div>
                    <p>{t('onboarding.step18.paragraph')}</p>
                </div>
            ),
            classNameTooltip: style.transform22,
            classArrow: style.arrow2,
        },
    ];

    return tooltipData;
};
