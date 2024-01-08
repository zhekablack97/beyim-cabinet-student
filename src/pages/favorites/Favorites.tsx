import classNames from 'classnames';
import { Header } from '../../features/Header';
import More from '../feed/more';
import style from './Favorites.module.scss';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetAllSubjectsQuery } from '../../api';
import {
    useGetBookmarksFeedQuery,
    useGetLikesFeedQuery,
} from '../../api/contentService';
import { ImagePost } from '../../features/ImagePost';
import { Post } from '../../types/GetContentsResponseApiType';
import { VideoPost } from '../../features/VideoPost';
import { ActivityPost } from '../../features/ActivityPost/ActivityPost';
import { Daum } from '../../types/GetCustomFeedRequestApiType';

const Favorites: React.FC = () => {
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const { data: subjects, isFetching: isFetchingSubjects } =
        useGetAllSubjectsQuery({ limit: 100 });
    const [variant, setVariant] = useState<'like' | 'bookmark'>('bookmark');
    const [openType, setOpenType] = useState<boolean>(false);
    const [openSubject, setOpenSubject] = useState<boolean>(false);
    const [subjectFilter, setSubjectFilter] = useState<number[]>([]);
    const [isActivity, setIsActivity] = useState<boolean>(false);
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [isImage, setIsImage] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    const include = [];
    isActivity && include.push('activity');
    isVideo && include.push('video');
    isImage && include.push('image');

    const { data: feedLikes, isFetching } = useGetLikesFeedQuery({
        include,
        locale: locale,
        page: 0,
        subjectIds: subjectFilter,
        limit: 50,
    });

    const { data: feedBookmarks, isFetching: isFetchingBookmarks } =
        useGetBookmarksFeedQuery({
            include,
            locale: locale,
            page: 0,
            subjectIds: subjectFilter,
            limit: 50,
        });

    return (
        <div className={classNames(' min-h-screen', style.wrapper)}>
            <Header />
            <main className="container  grid gap-4  grid-cols-12 pt-4">
                <nav className=" col-span-2"> Меню боковое </nav>

                <div className=" col-span-6 flex flex-col gap-4">
                    <div
                        className={classNames(
                            'flex pt-4 pb-3 px-4 rounded-2xl flex-col',
                            style.titleWrapper,
                        )}
                    >
                        <h1 className="text-xl font-semibold mb-1 leading-6">
                            {t('favorite.title')}
                        </h1>

                        <span
                            className={classNames(
                                'text-sm leading-6',
                                style.subTitle,
                            )}
                        >
                            {t('favorite.subTitle')}
                        </span>
                    </div>

                    {variant === 'like'
                        ? feedLikes &&
                          feedLikes.data.data.map(itemActivityFeed => {
                              const post = {
                                  microtopicId: itemActivityFeed.microtopicId,
                                  objectiveId: itemActivityFeed.objectiveId,
                                  subject: itemActivityFeed.subject,
                                  microtopic: itemActivityFeed.microtopic,
                                  objective: itemActivityFeed.objective,
                                  iconUrl: itemActivityFeed.iconUrl,
                                  // subjectId: 1,
                                  id: itemActivityFeed.post?.id,
                                  category: itemActivityFeed.category,
                                  resources: itemActivityFeed.post?.resources,
                                  contentId: itemActivityFeed.post?.contentId,
                                  description:
                                      itemActivityFeed.post?.description,
                                  thumbnail:
                                      itemActivityFeed.post?.thumbnail || '',
                              };

                              if (itemActivityFeed.category === 'image') {
                                  return (
                                      <ImagePost
                                          data={post as Post}
                                          key={itemActivityFeed.post?.id}
                                      />
                                  );
                              }

                              if (itemActivityFeed.category === 'video') {
                                  return (
                                      <div key={itemActivityFeed.post?.id}>
                                          <VideoPost data={post as Post} />
                                      </div>
                                  );
                              }

                              if (itemActivityFeed.category === 'activity') {
                                  return (
                                      // eslint-disable-next-line react/jsx-key
                                      <ActivityPost
                                          //   them={sectionId}
                                          //@ts-ignore
                                          data={itemActivityFeed}
                                      />
                                  );
                              }

                              return (
                                  <span
                                      className="block h-28"
                                      key={itemActivityFeed.post?.id}
                                  >
                                      {itemActivityFeed.post?.id}
                                  </span>
                              );
                          })
                        : feedBookmarks &&
                          feedBookmarks.data.data.map(itemActivityFeed => {
                              const post = {
                                  microtopicId: itemActivityFeed.microtopicId,
                                  objectiveId: itemActivityFeed.objectiveId,
                                  subject: itemActivityFeed.subject,
                                  microtopic: itemActivityFeed.microtopic,
                                  objective: itemActivityFeed.objective,
                                  iconUrl: itemActivityFeed.iconUrl,
                                  // subjectId: 1,
                                  id: itemActivityFeed.post?.id,
                                  category: itemActivityFeed.category,
                                  resources: itemActivityFeed.post?.resources,
                                  contentId: itemActivityFeed.post?.contentId,
                                  description:
                                      itemActivityFeed.post?.description,
                                  thumbnail:
                                      itemActivityFeed.post?.thumbnail || '',
                              };

                              if (itemActivityFeed.category === 'image') {
                                  return (
                                      <ImagePost
                                          data={post as Post}
                                          key={itemActivityFeed.post?.id}
                                      />
                                  );
                              }

                              if (itemActivityFeed.category === 'video') {
                                  return (
                                      <div key={itemActivityFeed.post?.id}>
                                          <VideoPost data={post as Post} />
                                      </div>
                                  );
                              }

                              if (itemActivityFeed.category === 'activity') {
                                  return (
                                      // eslint-disable-next-line react/jsx-key
                                      <ActivityPost
                                          //   them={sectionId}
                                          //@ts-ignore
                                          data={itemActivityFeed}
                                      />
                                  );
                              }

                              return (
                                  <span
                                      className="block h-28"
                                      key={itemActivityFeed.post?.id}
                                  >
                                      {itemActivityFeed.post?.id}
                                  </span>
                              );
                          })}

                    <More />
                </div>

                <aside className="col-span-4 flex flex-col gap-4">
                    <div
                        className={classNames(style.filter, 'rounded-2xl p-4')}
                    >
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    setVariant('bookmark');
                                }}
                                className={classNames(
                                    variant === 'bookmark'
                                        ? style.activeFavorite
                                        : '',
                                    'text-left px-2 py-3 text-sm font-medium rounded-lg leading-[17px]',
                                )}
                            >
                                {t('favorite.favorite')}
                            </button>
                            <button
                                onClick={() => {
                                    setVariant('like');
                                }}
                                className={classNames(
                                    variant === 'like'
                                        ? style.activeFavorite
                                        : '',
                                    'text-left px-2 py-3 text-sm font-medium  rounded-lg leading-[17px]',
                                )}
                            >
                                {t('favorite.likes')}
                            </button>
                        </div>
                        <hr
                            className={classNames(
                                'mt-2 mb-2 h-[1px]',
                                style.divide,
                            )}
                        />
                        <div
                            className={classNames(
                                ' flex flex-col',
                                openType ? 'gap-2' : '',
                            )}
                        >
                            <button
                                className=" w-full flex justify-between items-center"
                                onClick={() => {
                                    setOpenType(prev => !prev);
                                }}
                            >
                                <span
                                    className={classNames(
                                        style.openButton,
                                        'text-xs font-medium',
                                    )}
                                >
                                    {t('favorite.type')}
                                </span>
                                <img
                                    src="/icons/arrow-top.svg"
                                    className={classNames(
                                        'block h-6 w-6 duration-200  mr-2',
                                        openType ? '' : 'rotate-180',
                                    )}
                                    alt=""
                                />
                            </button>

                            <div
                                className={classNames(
                                    'overflow-hidden duration-200 flex flex-col px-2',
                                    openType ? 'h-f' : 'h-0',
                                    style.typeFilter,
                                )}
                            >
                                <input
                                    type="checkbox"
                                    onChange={e => {
                                        const value = e.target.checked;

                                        setIsActivity(value);
                                    }}
                                    className="hidden"
                                    id="activityFilter"
                                />
                                <label
                                    htmlFor="activityFilter"
                                    className={classNames(
                                        'cursor-pointer text-sm font-medium h-[41px] flex justify-between items-center',
                                    )}
                                >
                                    {t('favorite.activity')}
                                    <span
                                        className={classNames(
                                            ' block w-6 h-6 border-2 rounded bg-center',
                                        )}
                                    />
                                </label>
                                <input
                                    className="hidden"
                                    type="checkbox"
                                    id="videoFilter"
                                    onChange={e => {
                                        const value = e.target.checked;

                                        setIsVideo(value);
                                    }}
                                />
                                <label
                                    htmlFor="videoFilter"
                                    className={classNames(
                                        'cursor-pointer text-sm font-medium h-[41px] flex justify-between items-center',
                                    )}
                                >
                                    {t('favorite.video')}
                                    <span
                                        className={classNames(
                                            ' block w-6 h-6 border-2 rounded bg-center',
                                        )}
                                    />
                                </label>
                                <input
                                    className="hidden"
                                    type="checkbox"
                                    id="imageFilter"
                                    onChange={e => {
                                        const value = e.target.checked;

                                        setIsImage(value);
                                    }}
                                />
                                <label
                                    htmlFor="imageFilter"
                                    className={classNames(
                                        'cursor-pointer text-sm font-medium h-[41px] flex justify-between items-center',
                                    )}
                                >
                                    {t('favorite.image')}
                                    <span
                                        className={classNames(
                                            ' block w-6 h-6 border-2 rounded bg-center',
                                        )}
                                    />
                                </label>
                            </div>
                        </div>
                        <hr
                            className={classNames(
                                'mt-2 mb-2 h-[1px]',
                                style.divide,
                            )}
                        />
                        <div>
                            <button
                                onClick={() => {
                                    setOpenSubject(prev => !prev);
                                }}
                                className=" w-full flex justify-between items-center"
                            >
                                <span
                                    className={classNames(
                                        style.openButton,
                                        'text-xs font-medium',
                                    )}
                                >
                                    {t('favorite.subject')}
                                </span>
                                <img
                                    src="/icons/arrow-top.svg"
                                    className={classNames(
                                        'block h-6 w-6 duration-200 mr-2',
                                        openSubject ? '' : 'rotate-180',
                                    )}
                                    alt=""
                                />
                            </button>

                            <div
                                className={classNames(
                                    'overflow-hidden duration-200 flex flex-col px-2',
                                    openSubject ? 'h-f' : 'h-0',
                                    style.typeFilter,
                                )}
                            >
                                {subjects &&
                                    subjects.data.subjects.map(
                                        (item, index) => {
                                            return (
                                                <React.Fragment key={item.id}>
                                                    <input
                                                        type="checkbox"
                                                        id={
                                                            (String(item.id) ||
                                                                String(index)) +
                                                            'subjectFavorite'
                                                        }
                                                        className="hidden"
                                                        onChange={e => {
                                                            const value =
                                                                e.target
                                                                    .checked;

                                                            if (value) {
                                                                setSubjectFilter(
                                                                    prev => {
                                                                        const oldData =
                                                                            [
                                                                                ...prev,
                                                                            ];

                                                                        oldData.push(
                                                                            item.id,
                                                                        );

                                                                        return oldData;
                                                                    },
                                                                );
                                                            } else {
                                                                setSubjectFilter(
                                                                    prev => {
                                                                        const oldData =
                                                                            [
                                                                                ...prev,
                                                                            ];

                                                                        const index =
                                                                            oldData.indexOf(
                                                                                item.id,
                                                                            );
                                                                        if (
                                                                            index !==
                                                                            -1
                                                                        ) {
                                                                            oldData.splice(
                                                                                index,
                                                                                1,
                                                                            );
                                                                        }

                                                                        return oldData;
                                                                    },
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={
                                                            (String(item.id) ||
                                                                String(index)) +
                                                            'subjectFavorite'
                                                        }
                                                        className={classNames(
                                                            'cursor-pointer text-sm font-medium h-[41px] flex justify-between items-center',
                                                        )}
                                                    >
                                                        {
                                                            item.translations.find(
                                                                translation =>
                                                                    translation.locale ===
                                                                    locale,
                                                            )?.name
                                                        }
                                                        <span
                                                            className={classNames(
                                                                ' block w-6 h-6 border-2 rounded bg-center',
                                                            )}
                                                        />
                                                    </label>
                                                </React.Fragment>
                                            );
                                        },
                                    )}
                            </div>
                        </div>
                    </div>
                    {/* {' '}
                    <WithVideoOrImage
                        handleChangeFilter={handleChangeFilter}
                        withPicture={withPicture}
                        withVideo={withVideo}
                    />{' '}
                    <SectionStatus
                        data={dataSectionsBySubject?.data.sections || []}
                    /> */}
                </aside>
            </main>
        </div>
    );
};

export default Favorites;
