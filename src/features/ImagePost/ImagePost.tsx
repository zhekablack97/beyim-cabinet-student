import classNames from 'classnames';
import { Post } from '../../types/GetContentsResponseApiType';
import style from './ImagePost.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import ReactModal from 'react-modal';
import { useState } from 'react';
import { SliderPopup } from './utils';
import { HeaderPost } from '../HeaderPost';
import { FooterPost } from '../FooterPost';

interface IImagePost {
    data: Post;
}

export const ImagePost: React.FC<IImagePost> = ({ data }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openModal = (index: number) => {
        setCurrentSlide(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
    };

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"></span>';
        },
    };

    return (
        <article
            className={classNames(
                style.wrapper,
                'p-4 rounded-2xl sliderImagePost',
            )}
        >
            <HeaderPost
                iconUrl={data.iconUrl}
                objective={data.objective}
                subject={data.subject}
                id={data.id}
            />
            <div>
                <div className="mb-3">
                    {data.resources && data.resources.length > 0 && (
                        <>
                            <Swiper
                                className={classNames(style.wrapperSlider)}
                                slidesPerView={
                                    data.resources.length === 1 ? 1 : 2
                                }
                                pagination={pagination}
                                spaceBetween={8}
                                modules={[Pagination]}
                            >
                                {data.resources.map((item, index) => {
                                    return (
                                        <SwiperSlide
                                            key={item}
                                            className=" pb-3"
                                        >
                                            <div className=" max-w-full pt-[100%] relative overflow-hidden flex ">
                                                <button
                                                    className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl flex justify-center"
                                                    onClick={() => {
                                                        openModal(index);
                                                    }}
                                                >
                                                    <img
                                                        src={item}
                                                        alt=""
                                                        className="h-full max-w-none"
                                                    />
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                            <ReactModal
                                isOpen={isOpen}
                                contentLabel="Inline Styles Modal Example"
                                shouldCloseOnOverlayClick={true}
                                shouldCloseOnEsc={true}
                                onRequestClose={closeModal}
                                style={{
                                    overlay: {
                                        backgroundColor:
                                            'rgba(31, 41, 55, 0.90)',
                                        zIndex: 100,
                                    },
                                    content: {
                                        backgroundColor: 'transparent',
                                        border: 0,
                                        overflow: 'auto',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                }}
                            >
                                <div className="w-full h-full items-center justify-center flex">
                                    <SliderPopup
                                        data={data.resources}
                                        initialSlide={currentSlide}
                                    />

                                    <button
                                        className={classNames(
                                            ' top-0 absolute right-0 rounded-full w-10 h-10 flex items-center justify-center ',
                                            style.close,
                                        )}
                                        onClick={closeModal}
                                    >
                                        <img
                                            src="/icons/close.svg"
                                            alt=""
                                            className=" w-3 h-3"
                                        />
                                    </button>
                                </div>
                            </ReactModal>
                        </>
                    )}
                </div>
                <div>контент редактора </div>
            </div>

            <FooterPost postId={data.id} contentId={data.contentId} />
        </article>
    );
};
