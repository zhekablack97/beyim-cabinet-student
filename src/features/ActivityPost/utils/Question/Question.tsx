import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostCheckAnswerMutation } from '../../../../api/beyimProgress';
import { Activity } from '../../../../types/GetCustomFeedRequestApiType';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useLazyGetHintQuery } from '../../../../api/assessmentService';
import { Hint } from '../../../../types/GetHintResponseApiType';
import { SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import style from './Question.module.scss';
import { indexLatinLetters } from '../indexLatinLetters';
import { Like } from '../../../like';
import { Bookmark } from '../../../Bookmark';

interface IQuestion {
    data: Activity;
    onResize?: () => void;
    refSlide?: any;
}

export const Question: React.FC<IQuestion> = ({ data, onResize }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{
        answer: number | number[];
        id: string;
    }>();
    // eslint-disable-next-line no-debugger
    debugger;

    const [postCheckAnswer] = usePostCheckAnswerMutation();
    const [currentAnswers, setCurrentAnswers] = useState<{
        index: number[];
        isCorrect: boolean;
    }>({ index: [], isCorrect: false });
    const [currentHints, setCurrentHints] = useState<Hint[]>([]);
    const [getHint, { isFetching: isFetchingHints }] = useLazyGetHintQuery();
    const [isLastHint, setIsLastHint] = useState<boolean>(false);

    const onSubmit: SubmitHandler<{
        answer: number | number[];
        id: string;
    }> = dataForm => {
        postCheckAnswer({ answer: dataForm.answer, id: data.id })
            .unwrap()
            .then(res => {
                setCurrentAnswers(() => {
                    if (data.type === 'MS_MCQ') {
                        return {
                            index: [...(dataForm.answer as [])],
                            isCorrect: res.data.is_correct,
                        };
                    }

                    return {
                        index: [dataForm.answer as number],
                        isCorrect: res.data.is_correct,
                    };
                });
            });
    };

    const onHints = () => {
        if (!isLastHint && !isFetchingHints) {
            getHint({ id: data.id, offset: currentHints.length })
                .unwrap()
                .then(hint => {
                    console.log(hint, 'hint');
                    setCurrentHints(prev => {
                        const oldState = [...prev];

                        oldState.push(hint.data.hint);
                        return oldState;
                    });
                    setIsLastHint(hint.data.isLast);
                })
                .catch((error: any) => {
                    console.log(error, 'error');
                });
        }
    };

    useEffect(() => {
        if (onResize) {
            onResize();
        }
    }, [currentHints]);

    return (
        <div className="question">
            <form>
                <h2 className="text-base font-bold mb-4 ">{data.title}</h2>
                <div className="mb-4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Perspiciatis, architecto magnam delectus voluptas omnis,
                    saepe accusantium ipsam maxime officiis nemo nulla iusto
                    earum molestiae explicabo quod totam soluta dolorem laborum.
                    Provident nihil sit doloribus molestias nam ab saepe nemo
                    dicta eos culpa dolores unde quam debitis, incidunt officiis
                    perspiciatis dolor? Ut, molestiae est voluptate blanditiis
                    molestias fugit odio itaque veniam.
                    {/* {data.body} */}
                </div>

                {data.options.map((option, index) => {
                    const id = nanoid();

                    console.log(
                        currentAnswers.index.find(
                            //@ts-ignore
                            element => element === String(index),
                        ),
                        'currentAnswers.index.includes(index)',
                    );
                    console.log(currentAnswers, 'currentAnswers');
                    return (
                        <div key={option.Body}>
                            <input
                                id={id}
                                type={
                                    data.type === 'MS_MCQ'
                                        ? 'checkbox'
                                        : 'radio'
                                }
                                value={index}
                                {...register(
                                    data.type === 'MS_MCQ'
                                        ? `answer.${index}`
                                        : `answer`,
                                )}
                                className={classNames(style.input, 'hidden')}
                            />
                            <label
                                htmlFor={id}
                                className={classNames(
                                    'border-2 rounded-xl p-4 mb-1 cursor-pointer flex items-center gap-3 duration-200',
                                    style.option,
                                    //@ts-ignore
                                    currentAnswers.index.includes(String(index))
                                        ? currentAnswers.isCorrect
                                            ? style.answerTrue
                                            : style.answerFalse
                                        : '',
                                )}
                            >
                                <span
                                    className={classNames(
                                        'block w-6 h-6 shrink-0 grow-0 border-2 bg-center  rounded-full',
                                        style.checked,
                                    )}
                                />
                                <span className={classNames(style.index)}>
                                    {indexLatinLetters[index]}
                                </span>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Ipsam hic alias quod nam
                                facere ad provident autem delectus placeat!
                                Fugiat quaerat vitae ipsam explicabo a similique
                                qui ducimus distinctio molestias?
                                {/* {option.Body} */}
                            </label>
                        </div>
                    );
                })}

                <div className="mb-4">
                    {currentHints.map((item, index) => {
                        const id = nanoid();

                        return (
                            <div
                                key={id}
                                className={classNames(
                                    'px-3 py-4 rounded-2xl mb-1',
                                    style.hint,
                                )}
                            >
                                <span
                                    className={classNames(
                                        style.hintCount,
                                        'text-sm font-bold block',
                                    )}
                                >
                                    Подсказка {index + 1} из {data.hintsCount}
                                </span>
                                <span className={classNames(' block')}>
                                    {' '}
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit.
                                </span>

                                {/* {item.body} */}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between pb-1 items-center">
                    <div className="flex gap-4">
                        <Like postId={data.id} postType="activity" />
                        <Bookmark postId={data.id} postType="activity" />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className={classNames(
                                ' w-12 h-11 flex items-center justify-center rounded-2xl duration-200',
                                style.hintButton,
                                currentHints.length === data.hintsCount &&
                                    'opacity-50',
                                currentHints.length === data.hintsCount &&
                                    style.hintButtonDisable,
                            )}
                            disabled={currentHints.length === data.hintsCount}
                            onClick={onHints}
                        >
                            <img
                                src="/icons/hint.svg"
                                className="block h-6 w-6"
                                alt=""
                            />
                        </button>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            className={classNames(
                                'flex items-center tracking-[1px] justify-center px-6 rounded-2xl uppercase text-xs font-bold',
                                style.checkAnswer,
                                !watch('answer') && style.checkAnswerDisable,
                            )}
                            type="button"
                            disabled={!watch('answer')}
                        >
                            проверить
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

///api/v1/bookmark?postId=656d8e4c66ad80c6cbda8af7&postType=post
///api/v1/bookmark?postId=655c89939fc9a3c2698ca49f&postType=activity
