import classNames from 'classnames';
import { Daum } from '../../types/GetCustomFeedRequestApiType';
import { HeaderPost } from '../HeaderPost';
import style from './ActivityPost.module.scss';
import { Question } from './utils/Question';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

interface IActivityPost {
    data: Daum;
}

export const ActivityPost: React.FC<IActivityPost> = ({ data }) => {
    const [sliderRef, setSliderRef] = useState<any>(0);
    const [count, setCount] = useState<number>(200);

    return (
        <div className={classNames('p-4 rounded-2xl', style.wrapper)}>
            <HeaderPost
                iconUrl={data.iconUrl}
                objective={data.objective}
                subject={data.subject}
            />
            {data.activities ? (
                <div>
                    <Swiper
                        onSwiper={(swiper: any) => {
                            setSliderRef(swiper);
                        }}
                        autoHeight={true}
                        modules={[Pagination, Navigation]}
                        navigation={true}
                        pagination={{
                            type: 'fraction',
                        }}
                        height={200}
                        updateOnWindowResize={true}
                    >
                        {data.activities.map((item, index) => {
                            return (
                                <SwiperSlide key={`${item?.id}`}>
                                    <Question
                                        onChange={() => {
                                            // sliderRef.update();
                                            //@ts-ignore
                                           

                                            if (sliderRef) {
                                                 // eslint-disable-next-line no-debugger
                                                debugger;
                                                sliderRef.updateAutoHeight(200);
                                                
                                            }
                                        }}
                                        data={item}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                data.activity && (
                    <div key={data.activity?.id}>
                        <Question data={data.activity} />
                    </div>
                )
            )}
        </div>
    );
};
