import classNames from 'classnames';
import style from '../../../features/ImagePost/ImagePost.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { HeaderPost } from '../../HeaderPost';
import { useTranslation } from 'react-i18next';
import { getData } from '../utils/data';
import { FooterOnboarding } from '../FooterOnboarding';
import { useEffect, useState } from 'react';

export const ImageOnboarding: React.FC<{
    currentStep: number;
}> = ({ currentStep }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"></span>';
        },
    };
    const { t } = useTranslation();
    const data = getData();
    const [levelSame, setLevelSame] = useState('5');
    useEffect(() => {
        if (currentStep === 5) {
            setLevelSame('5');
        }
        if (currentStep === 6) {
            setLevelSame('6');
        }
    }, [currentStep]);

    return (
        <article
            className={classNames(
                style.wrapper,
                'p-4 rounded-2xl sliderImagePost',
                currentStep === 2 && 'z-210',
            )}
        >
            <div data-tooltip-id="2">
                <HeaderPost
                    iconUrl={data.subjects[0].url}
                    objective={data.subjects[0].objective}
                    subject={data.subjects[0].name}
                />
            </div>
            <div>
                <div className="mb-3">
                    <Swiper
                        className={classNames(style.wrapperSlider)}
                        slidesPerView={2}
                        pagination={pagination}
                        spaceBetween={8}
                        modules={[Pagination]}
                    >
                        <SwiperSlide className="pb-3">
                            <div className="max-w-full pt-[100%] relative overflow-hidden flex ">
                                <button className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl flex justify-center">
                                    <div className={style.emptyPhoto}></div>
                                </button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="pb-3">
                            <div className="max-w-full pt-[100%] relative overflow-hidden flex ">
                                <button className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl flex justify-center">
                                    <div className={style.emptyPhoto}></div>
                                </button>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="pb-3"></SwiperSlide>
                        <SwiperSlide className="pb-3"></SwiperSlide>
                        <SwiperSlide className="pb-3"></SwiperSlide>
                    </Swiper>
                </div>
                <div></div>
                <div className={style.content}>
                    <div className={`${style.accordion} `}>
                        <h3 className={`${style.accordion_title}`}>
                            {t('onboarding.post.titleImage')}
                        </h3>
                        {t('onboarding.post.descriptionImage')}
                    </div>

                    <button className={style.buttonMore}>
                        {t('onboarding.more')}
                    </button>
                </div>
            </div>
            <FooterOnboarding />
            <div></div>
        </article>
    );
};
