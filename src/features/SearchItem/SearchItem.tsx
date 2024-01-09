import classNames from 'classnames';
import { Post } from '../../types/GetContentsResponseApiType';
import style from './SearchItem.module.scss';
import { useState } from 'react';
import { SliderPopup } from '../SliderPopup';
import ReactModal from 'react-modal';
import { Link, useSearchParams } from 'react-router-dom';
import { LexcialEditor } from '../LexicalEditor/LexcialEditor';

interface ISearchItem {
    data: Post;
    openGallery?: (isOpen: boolean) => void;
    closeGallery?: (isOpen: boolean) => void;
}

export const SearchItem: React.FC<ISearchItem> = ({
    data,
    closeGallery,
    ...rest
}) => {
    const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
    const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const closePopupGallery = () => {
        setIsOpenGallery(false);
        if (closeGallery) {
            closeGallery(false);
        }
    };

    const openPopupGallery = () => {
        setIsOpenGallery(true);
        if (closeGallery) {
            closeGallery(true);
        }
    };

    return (
        <article
            className={classNames(
                style.wrapper,
                'flex  p-4 gap-[14px] rounded-2xl border-2 border-solid',
                isOpenPost ? 'h-fit' : 'h-40',
            )}
            key={data.id}
            {...rest}
        >
            <div
                className={classNames(
                    'w-32 h-32 flex items-center justify-center grow-0 shrink-0 relative rounded-xl overflow-hidden',
                )}
            >
                <img
                    src={data.resources[0]}
                    className="max-w-[128px] max-h-[112px]"
                    alt=""
                />
                <button
                    className={classNames(
                        'absolute top-0 right-0 w-full h-full rounded-xl',
                        style.buttonGallery,
                    )}
                    onClick={openPopupGallery}
                >
                    <img
                        src="/icons/postImage.svg"
                        alt=""
                        className="w-[21px] h-6 absolute top-1 right-1 block"
                    />
                </button>
            </div>
            <div
                className={classNames(
                    'shrink-0 grow-0 relative',
                    style.content,
                )}
            >
                <header
                    className={classNames('flex items-center gap-2  w-full')}
                >
                    <div className="w-8 h-8 grow-0 shrink-0">
                        <img
                            src={data.iconUrl}
                            alt=""
                            className="block w-full h-full"
                        />
                    </div>

                    <div
                        className={classNames(
                            'block grow-0 shrink-0 ',
                            style.titleWrapper,
                        )}
                    >
                        <h2
                            className={classNames(
                                'overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold',
                                style.title,
                            )}
                        >
                            {data.subject}
                        </h2>
                        <span
                            className={classNames(
                                'overflow-hidden whitespace-nowrap text-ellipsis block text-sm font-medium',
                                style.subTitle,
                            )}
                        >
                            {data.objective}
                        </span>
                    </div>
                </header>
                <div className="flex flex-col items-start">
                    <h3
                        className={classNames(
                            'overflow-hidden whitespace-nowrap text-ellipsis block text-base font-semibold mb-1',
                            style.microtopic,
                        )}
                    >
                        {data.microtopic}
                    </h3>
                    <div
                        className={classNames(
                            'overflow-hidden text-ellipsis block text-sm w-full ',
                            isOpenPost ? 'h-fit' : 'h-[42px]',
                        )}
                    >
                        <LexcialEditor fieldData={data.description} />
                    </div>
                    <button
                        onClick={() => {
                            setIsOpenPost(prev => !prev);
                        }}
                        className={classNames('text-sm mb-2 block', style.more)}
                    >
                        {isOpenPost ? 'скрыть' : '...см ещё'}
                    </button>
                    {isOpenPost && (
                        <div>
                            <button
                                onClick={() => {
                                    setSearchParams(prev => {
                                        return {
                                            idContent:
                                                String(data.contentId) || '',
                                            fromSearch: 'true',
                                            subject: prev.get('subject') || '',
                                            sectionsBySubject:
                                                prev.get('sectionsBySubject') ||
                                                '',
                                            them: prev.get('them') || '',
                                        };
                                    });
                                }}
                                className={classNames(
                                    'rounded-2xl  h-11 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] p-3',
                                    style.moreLink,
                                )}
                            >
                                подробнее
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ReactModal
                isOpen={isOpenGallery}
                contentLabel="Inline Styles Modal Example"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                onRequestClose={closePopupGallery}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(31, 41, 55, 0.90)',
                        zIndex: 2002,
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
                    <SliderPopup data={data.resources} />

                    <button
                        className={classNames(
                            ' top-0 absolute right-0 rounded-full w-10 h-10 flex items-center justify-center ',
                            style.close,
                        )}
                        onClick={closePopupGallery}
                    >
                        <img
                            src="/icons/close.svg"
                            alt=""
                            className=" w-3 h-3"
                        />
                    </button>
                </div>
            </ReactModal>
        </article>
    );
};
