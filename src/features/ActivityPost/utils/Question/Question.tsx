import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostCheckAnswerMutation } from '../../../../api/beyimProgress';
import { Activity } from '../../../../types/GetCustomFeedRequestApiType';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { useLazyGetHintQuery } from '../../../../api/assessmentService';
import { Hint } from '../../../../types/GetHintResponseApiType';
import { SwiperSlide } from 'swiper/react';

interface IQuestion {
    data: Activity;
    onResize?: () => void;
    refSlide?: any;
}

export const Question: React.FC<IQuestion> = ({ data, onResize }) => {
    const refWrapper = useRef(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<{
        answer: number | number[];
        id: string;
    }>();

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
                });
        }
    };

    useEffect(() => {
        if (onResize) {
            onResize();
        }
    }, [currentHints]);

    return (
        <div ref={refWrapper}>
            <form>
                <h2>{data.title}</h2>
                <div>{data.body}</div>

                {data.type === 'MS_MCQ'
                    ? data.options.map((option, index) => {
                          const id = nanoid();
                          return (
                              <div key={option.Body}>
                                  <input
                                      id={id}
                                      type="checkbox"
                                      value={index}
                                      {...register(`answer.${index}`)}
                                  />
                                  <label htmlFor={id}>{option.Body}</label>
                              </div>
                          );
                      })
                    : data.options.map((option, index) => {
                          const id = nanoid();
                          return (
                              <div key={option.Body}>
                                  <input
                                      type="radio"
                                      value={index}
                                      {...register('answer')}
                                      id={id}
                                  />
                                  <label htmlFor={id}>{option.Body}</label>
                              </div>
                          );
                      })}

                <div>
                    {currentHints.map(item => {
                        const id = nanoid();

                        return <div key={id}>{item.body}</div>;
                    })}
                </div>
                <button type="button" onClick={onHints}>
                    Подсказка
                </button>
                <button onClick={handleSubmit(onSubmit)} type="button">
                    проверить
                </button>
            </form>
        </div>
    );
};
