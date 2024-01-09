import React, { ReactNode, useEffect, useState } from 'react';

import { PlacesType, Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';

import style from './TooltipOnboarding.module.scss';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface TooltipOnBoardingProps {
    currentStep: number;
    setCurrentStep: (currentStep: number) => void;
    id: string;
    place: string;
    content: ReactNode;
    classTooltip?: string;
    classArrow?: string;
    offset?: number;
}

const scrollToElement = (step: number): Promise<void> => {
    return new Promise(resolve => {
        const element = document.getElementById(`step-${step}`);
        if (element) {
            const elementPosition =
                element.getBoundingClientRect().y + window.scrollY;
            const scrollLocation = step === 5 ? 500 : -200;
            if (step !== 5) {
                window.scrollTo({
                    top: elementPosition + scrollLocation,
                    behavior: 'smooth',
                });
            }
            setTimeout(() => {
                if (step === 5) {
                    window.scrollTo({
                        top: elementPosition + scrollLocation,
                        behavior: 'smooth',
                    });
                }
                resolve();
            }, 1200);
        } else {
            resolve();
        }
    });
};

export const TooltipOnBoarding = ({
    currentStep,
    setCurrentStep,
    id,
    place,
    content,
    classTooltip,
    classArrow,
    offset,
}: TooltipOnBoardingProps) => {
    const navigate = useNavigate();

    const { t } = useTranslation();

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
                if (currentStep === 6) {
                    setCurrentStep(currentStep + 1);
                    scrollToElement(currentStep + 1);
                } else {
                    scrollToElement(currentStep + 1).then(() => {
                        setCurrentStep(currentStep + 1);
                    });
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentStep]);

    console.log(currentStep, 123);

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
            offset={offset}
        >
            <div>
                <div>{content}</div>
                <div className="flex justify-between">
                    <button
                        className={style.button}
                        onClick={() => {
                            navigate(`/feed`);
                        }}
                    >
                        fewf
                    </button>
                    <div className="flex gap-3">
                        <div
                            className={`${
                                currentStep === 1
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            }`}
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
                            className={`${
                                currentStep === 18
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            }`}
                            aria-disabled={currentStep === 18}
                            onClick={() => {
                                if (currentStep === 18) return;
                                if (currentStep === 6) {
                                    setCurrentStep(currentStep + 1);
                                    scrollToElement(currentStep + 1);
                                } else {
                                    scrollToElement(currentStep + 1).then(
                                        () => {
                                            setCurrentStep(currentStep + 1);
                                        },
                                    );
                                }
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
