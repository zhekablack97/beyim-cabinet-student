import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface ISliderPopup {
    data: string[];
    initialSlide: number;
}

export const SliderPopup: React.FC<ISliderPopup> = ({ data, initialSlide }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="w-full max-w-3xl sliderPopup">
            <div className=" mb-4">
                <Swiper
                    initialSlide={initialSlide}
                    style={{
                        //@ts-ignore
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {data.map(item => {
                        return (
                            <SwiperSlide key={item}>
                                <div className="px-[68px] max-h-[70vh] flex items-center justify-center">
                                    <img src={item} className="w-full" />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className="px-[68px]">
                <Swiper
                    //@ts-ignore
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {data.map(item => {
                        return (
                            <SwiperSlide key={item}>
                                <img
                                    src={item}
                                    className="block rounded overflow-hidden cursor-pointer"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};
