import classNames from 'classnames';
import style from '../../../features/ActivityPost/ActivityPost.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { HeaderPost } from '../../HeaderPost';
import { indexLatinLetters } from '../../ActivityPost/utils/indexLatinLetters';
import { useForm } from 'react-hook-form';
import { Bookmark } from '../../Bookmark';
import { Like } from '../../like';
import styleQuestion from '../../../features/ActivityPost/utils/Question/Question.module.scss';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';

export const ActivityOnboarding: React.FC<{ currentStep: number }> = ({
    currentStep,
}) => {
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

    const [currentAnswers, setCurrentAnswers] = useState<{
        index: number[];
        isCorrect: boolean;
    }>({ index: [], isCorrect: false });
    return (
        <div
            className={classNames(
                'p-4 rounded-2xl activity',
                style.wrapper,
                currentStep === 7 && 'z-210',
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
                <Swiper>
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
                                            (option: any, index: number) => {
                                                const id = nanoid();

                                                return (
                                                    <div key={option.Body}>
                                                        <input
                                                            id={id}
                                                            type={'radio'}
                                                            value={index}
                                                            {...register(
                                                                `answer`,
                                                            )}
                                                            className={classNames(
                                                                styleQuestion.input,
                                                                'hidden',
                                                            )}
                                                        />
                                                        <label
                                                            htmlFor={id}
                                                            className={classNames(
                                                                'border-2 rounded-xl p-4 mb-1 cursor-pointer flex items-center gap-3 duration-200',
                                                                styleQuestion.option,
                                                                currentAnswers.index.includes(
                                                                    //@ts-ignore
                                                                    String(
                                                                        index,
                                                                    ),
                                                                )
                                                                    ? currentAnswers.isCorrect
                                                                        ? styleQuestion.answerTrue
                                                                        : styleQuestion.answerFalse
                                                                    : '',
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
                                                        ' w-12 h-11 flex items-center justify-center rounded-2xl duration-200',
                                                        styleQuestion.hintButton,
                                                        currentStep === 8 &&
                                                            'z-210',
                                                    )}
                                                >
                                                    <img
                                                        src="/icons/hint.svg"
                                                        className="block h-6 w-6"
                                                        alt=""
                                                    />
                                                </button>
                                                <button
                                                    className={classNames(
                                                        'flex items-center tracking-[1px] justify-center px-6 rounded-2xl uppercase text-xs font-bold',
                                                        styleQuestion.checkAnswer,
                                                        styleQuestion.checkAnswerDisable,
                                                    )}
                                                >
                                                    проверить
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <hr
                        data-tooltip-id="8"
                        className={classNames(
                            'absolute h-[2px] bottom-12 w-full rounded-[10px]',
                            style.hr,
                        )}
                    />
                    <div data-tooltip-id="9" style={{}}>
                        1 {t('onboarding.outOf')} 2
                    </div>
                </Swiper>
            </div>
        </div>
    );
};
