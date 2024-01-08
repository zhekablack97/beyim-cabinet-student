import classNames from 'classnames';
import style from '../../../features/ActivityPost/ActivityPost.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { HeaderPost } from '../../HeaderPost';
import { indexLatinLetters } from '../../ActivityPost/utils/indexLatinLetters';
import { useForm } from 'react-hook-form';

import styleQuestion from '../../../features/ActivityPost/utils/Question/Question.module.scss';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';
import styleOnboarding from '../OnboardingComponents.module.scss';

export const ActivityOnboarding: React.FC<{
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
    activeActivity: string;
    setActiveActivity: React.Dispatch<React.SetStateAction<string>>;
}> = ({ currentStep, setCurrentStep, activeActivity, setActiveActivity }) => {
    const data = getData();
    const { t } = useTranslation();
    const {
        register,
        watch,
        formState: { errors },
    } = useForm<{
        answer: number | number[];
        id: string;
    }>();
    const [numberStep, setNumberStep] = useState<string>('8');
    const [buttonCheckClicked, setButtonCheckClicked] = useState(false);
    const [buttonStart, setButtonStart] = useState(false);
    const [labelChecked, setLabelChecked] = useState(false);

    const [currentAnswers, setCurrentAnswers] = useState<{
        index: number[];
        isCorrect: boolean;
    }>({ index: [], isCorrect: false });

    useEffect(() => {
        if (currentStep === 8) {
            setNumberStep('8');
        }
        if (currentStep === 9) {
            setNumberStep('9');
        }
        if (currentStep === 10) {
            setActiveActivity('10');
        }
        if (currentStep === 11) {
            setActiveActivity('11');
        }

        setLabelChecked(false);
    }, [currentStep]);
    useEffect(() => {
        if (currentStep === 10) {
            setTimeout(() => {
                setLabelChecked(true);
            }, 500);
            setTimeout(() => {
                setButtonCheckClicked(true);
            }, 1000);
            setTimeout(() => {
                setButtonCheckClicked(false);
            }, 1300);
            setTimeout(() => {
                setCurrentStep(prev => (prev >= 10 ? currentStep + 1 : prev));
            }, 2000);
        }
    }, [currentStep]);

    return (
        <div
            className={classNames(
                'p-4 rounded-2xl activity',
                style.wrapper,
                currentStep === 7 || currentStep === 10 || currentStep === 11
                    ? 'z-210'
                    : '',
            )}
            id="step-7"
            data-tooltip-id="7"
        >
            <HeaderPost
                iconUrl={data.subjects[0].url}
                objective={data.subjects[0].objective}
                subject={data.subjects[0].name}
            />

            <div className="relative">
                <Swiper
                    autoHeight={true}
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    pagination={{
                        type: 'fraction',
                        renderFraction: (
                            currentClass: string,
                            totalClass: string,
                        ) => {
                            return (
                                `<span class=" text-base font-bold ${style.pagination} ` +
                                currentClass +
                                '"></span>' +
                                `<span class="text-base font-bold ${style.pagination}"> из </span> ` +
                                `<span class=" text-base font-bold ${style.pagination} ` +
                                totalClass +
                                '"></span>'
                            );
                        },
                    }}
                    height={200}
                    updateOnWindowResize={true}
                >
                    {data.subjects.map((item, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="pb-16">
                                <div className="question">
                                    <form>
                                        <h2 className="text-base font-bold mb-4 ">
                                            {t(
                                                'onboarding.post.activityQuestion',
                                            )}
                                        </h2>

                                        {data.options.map(
                                            (option, index: number) => {
                                                const id = nanoid();
                                                return (
                                                    <div key={option}>
                                                        <input
                                                            id={id}
                                                            type={'radio'}
                                                            value={index}
                                                            {...register(
                                                                'answer',
                                                            )}
                                                            checked={
                                                                index === 1 &&
                                                                labelChecked
                                                            }
                                                            className={classNames(
                                                                labelChecked &&
                                                                    styleQuestion.input,
                                                                'hidden',
                                                            )}
                                                        />
                                                        <label
                                                            data-tooltip-id={
                                                                index === 1
                                                                    ? activeActivity
                                                                    : ''
                                                            }
                                                            htmlFor={id}
                                                            className={classNames(
                                                                'border-2 rounded-xl p-4 mb-1 cursor-pointer flex items-center gap-3 duration-200',
                                                                styleQuestion.option,
                                                                currentStep ===
                                                                    11 &&
                                                                    index ===
                                                                        1 &&
                                                                    styleQuestion.answerTrue,
                                                            )}
                                                        >
                                                            <span
                                                                className={classNames(
                                                                    'block w-6 h-6 shrink-0 grow-0 border-2 bg-center  rounded-full',

                                                                    styleQuestion.checked,
                                                                )}
                                                            />
                                                            <span
                                                                className={classNames(
                                                                    styleQuestion.index,
                                                                )}
                                                            >
                                                                {
                                                                    indexLatinLetters[
                                                                        index
                                                                    ]
                                                                }
                                                            </span>
                                                            {option}
                                                            {/* {option.Body} */}
                                                        </label>
                                                    </div>
                                                );
                                            },
                                        )}

                                        <div className="mb-4"></div>
                                        <div className="flex justify-between pb-1 items-center">
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    className="flex gap-2 items-center h-7 justify-between"
                                                >
                                                    <img
                                                        src={
                                                            '/icons/activeHeart.svg'
                                                        }
                                                        alt=""
                                                        className="block h-7 w-7"
                                                    />{' '}
                                                    <span
                                                        className={classNames(
                                                            'text-base font-bold ',
                                                            style.count,
                                                            style.active,
                                                        )}
                                                    >
                                                        32
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex gap-2 items-center h-7 justify-between"
                                                >
                                                    <img
                                                        src={
                                                            '/icons/bookmarkActive.svg'
                                                        }
                                                        alt=""
                                                        className="block h-7 w-7"
                                                    />{' '}
                                                    <span
                                                        className={classNames(
                                                            'text-base font-bold ',
                                                            style.count,
                                                            style.active,
                                                        )}
                                                    >
                                                        14
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    className={classNames(
                                                        'w-12 h-11 flex items-center justify-center rounded-2xl duration-200',
                                                        styleQuestion.hintButton,
                                                        currentStep === 8 &&
                                                            'z-210',
                                                    )}
                                                >
                                                    <img
                                                        className={` block h-6 w-6`}
                                                        src="/icons/hint.svg"
                                                        alt=""
                                                    />
                                                </button>
                                                <button
                                                    data-tooltip-id="8"
                                                    className={`${
                                                        !labelChecked
                                                            ? styleOnboarding.button_disabled
                                                            : styleOnboarding.button_info
                                                    } ${
                                                        styleOnboarding.button_info_text
                                                    } ${
                                                        buttonCheckClicked
                                                            ? styleOnboarding.activeButton
                                                            : ''
                                                    }
                                                    ${
                                                        currentStep === 11 &&
                                                        styleOnboarding.button_info
                                                    }
                    `}
                                                >
                                                    {currentStep !== 11
                                                        ? t(
                                                              'onboarding.post.check',
                                                          )
                                                        : t('onboarding.again')}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <hr
                        data-tooltip-id={numberStep}
                        className={classNames(
                            'absolute h-[2px] bottom-12 w-full rounded-[10px]',
                            style.hr,
                        )}
                    />
                </Swiper>
            </div>
        </div>
    );
};
