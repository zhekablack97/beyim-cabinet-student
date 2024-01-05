import React, { ReactNode, useEffect } from 'react';

import { PlacesType, Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import style from '../OnboardingComponents.module.scss';

import { useTranslation } from 'react-i18next';
export interface TooltipOnBoardingProps {
    currentStep: number;
    setCurrentStep: (currentStep: number) => void;
    id: string;
    place: string;
    content: ReactNode;
    classTooltip?: string;
    classArrow?: string;
}
const scrollToElement = (step: number): Promise<void> => {
    return new Promise(resolve => {
        const element = document.getElementById(`step-${step}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
            setTimeout(() => {
                resolve();
            }, 1200);
        } else {
            resolve();
        }
    });
};
const TooltipOnBoarding = ({
    currentStep,
    setCurrentStep,
    id,
    place,
    content,
    classTooltip,
    classArrow,
}: TooltipOnBoardingProps) => {
    const { t } = useTranslation(['onboarding']);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft' && currentStep > 1) {
                scrollToElement(currentStep - 1).then(() => {
                    setCurrentStep(currentStep - 1);
                });
            } else if (
                event.key === 'ArrowRight' &&
                currentStep < 18 &&
                currentStep > 0
            ) {
                scrollToElement(currentStep + 1).then(() => {
                    setCurrentStep(currentStep + 1);
                });
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentStep]);
    console.log(id);

    return (
        <Tooltip
            id={id}
            clickable={true}
            className={`${style.tooltip} ${classTooltip ? classTooltip : ''}`}
            classNameArrow={`${style.tooltip_arrow} ${
                classArrow ? classArrow : ''
            }`}
            isOpen={currentStep === +id}
            place={place as PlacesType}
        >
            <div>
                <div>{content}</div>
                <div className="d-flex justify-content-between">
                    <button
                        className={style.onBoarding_button}
                        onClick={() => {
                            setCurrentStep(0);
                            // router.push(`/${router.query.locale}/student/feed`);
                        }}
                    >
                        {t('onboarding:close')}
                    </button>
                    <div
                        className="d-flex"
                        style={{
                            gap: '12px',
                        }}
                    >
                        <div
                            style={{
                                cursor:
                                    currentStep === 1 ? 'default' : 'pointer',
                            }}
                            onClick={() => {
                                if (currentStep === 1) return;
                                scrollToElement(currentStep - 1).then(() => {
                                    setCurrentStep(currentStep - 1);
                                });
                            }}
                        >
                            <img
                                src={
                                    currentStep === 1
                                        ? '/icons/leftBoardDisabled.svg'
                                        : '/icons/leftBoard.svg'
                                }
                                alt="leftBoard"
                                width={24}
                                height={24}
                            />
                        </div>
                        <div
                            style={{
                                cursor:
                                    currentStep === 18 ? 'default' : 'pointer',
                            }}
                            aria-disabled={currentStep === 18}
                            onClick={() => {
                                if (currentStep === 18) return;
                                scrollToElement(currentStep + 1).then(() => {
                                    setCurrentStep(currentStep + 1);
                                });
                            }}
                        >
                            <img
                                src={
                                    currentStep === 18
                                        ? '/icons/rightBoardDisabled.svg'
                                        : '/icons/rightBoard.svg'
                                }
                                alt="rightBoard"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Tooltip>
    );
};

export default TooltipOnBoarding;
