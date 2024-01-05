/* eslint-disable react/display-name */
import classNames from 'classnames';
import { Daum } from '../../types/GetCustomFeedRequestApiType';
import { HeaderPost } from '../HeaderPost';
import style from './ActivityPost.module.scss';
import { Question } from './utils/Question';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import React, { useEffect, useRef, useState } from 'react';
import { current, nanoid } from '@reduxjs/toolkit';
import { Element } from 'react-scroll';
import { useSearchParams } from 'react-router-dom';

interface IActivityPost {
    data: Daum;
    them?: string;
}

export const ActivityPost: React.FC<IActivityPost> = ({ data }) => {
    const [sliderRef, setSliderRef] = useState<any>(0);
    // const [] = useState<number>(200);
    const [searchParams, setSearchParams] = useSearchParams();

    const idActivity = searchParams.get('idActivity');
    useEffect(() => {
        if (idActivity) {
            if (sliderRef) {
                const currentIndex = data.activities?.findIndex(activity => {
                    return activity.id === idActivity;
                });

                currentIndex !== -1 && sliderRef.slideTo(currentIndex, 500);
            }
        }
    }, [idActivity, sliderRef]);

    return (
        <div className={classNames('p-4 rounded-2xl activity', style.wrapper)}>
            <HeaderPost
                iconUrl={data.iconUrl}
                objective={data.objective}
                subject={data.subject}
            />
            {data.activities ? (
                <div className="relative">
                    {data.activities.map(item => {
                        return (
                            <Element
                                key={`${item.id}-element`}
                                name={item.id}
                                className="element"
                            ></Element>
                        );
                    })}

                    <Swiper
                        onSwiper={(swiper: any) => {
                            setSliderRef(swiper);
                        }}
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
                        {data.activities.map(item => {
                            return (
                                <SwiperSlide key={`${item?.id}`}>
                                    <div
                                        className={
                                            data.activities &&
                                            data.activities.length > 1
                                                ? 'pb-16'
                                                : ''
                                        }
                                    >
                                        <Question
                                            onResize={() => {
                                                if (sliderRef) {
                                                    sliderRef.updateAutoHeight(
                                                        200,
                                                    );
                                                }
                                            }}
                                            data={item}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {data.activities.length > 1 && (
                        <hr
                            className={classNames(
                                'absolute h-[2px] bottom-12 w-full rounded-[10px]',
                                style.hr,
                            )}
                        />
                    )}
                </div>
            ) : (
                data.activity && (
                    <div key={data.activity?.id}>
                        <Element
                            name={data.activity.id}
                            className="element"
                        ></Element>
                        <div>
                            <Question data={data.activity} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};
