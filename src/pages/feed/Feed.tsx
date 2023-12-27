import { useTranslation } from 'react-i18next';
import {
    useGetCustomFeedQuery,
    useGetFeedQuery,
} from '../../api/contentService';
import { Header } from '../../features/Header';
import { SubjectsFilter } from '../../features/SubjectsFilter';
import { useEffect, useRef, useState } from 'react';
import { Post } from '../../types/GetContentsResponseApiType';
import { ImagePost } from '../../features/ImagePost';
import style from './Feed.module.scss';
import classNames from 'classnames';
import { VideoPost } from '../../features/VideoPost';

import More from './more';
import {
    useGetFeedMicrotopicsQuery,
    useGetSectionsBySubjectQuery,
} from '../../api/programService';
import { useSearchParams } from 'react-router-dom';
import { WithVideoOrImage } from '../../features/WithVideoOrImage';
import { SectionStatus } from '../../features/SectionStatus';

const Feed: React.FC = () => {
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    //логика для загрузки обычной ленты
    const [currentPage, setCurrentPage] = useState<number>(0);
    const {
        data: dataFeed,
        isFetching,
        refetch,
    } = useGetFeedQuery({
        limit: 3,
        page: currentPage,
        locale,
    });
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [withVideo, setWithVideo] = useState<boolean>(true);
    const [withPicture, setWithPicture] = useState<boolean>(true);

    //для специальной ленты
    const [searchParams] = useSearchParams();
    const { data: dataSectionsBySubject } = useGetSectionsBySubjectQuery({
        subject_id: searchParams.get('subject') || '',
        limit: 100,
    });

    //если тема есть, если есть в адресной строке, если есть данные, ну и пустай строка
    const { data: dataFeedMicrotopics } = useGetFeedMicrotopicsQuery({
        section_id: String(
            searchParams.get('them') ||
                dataSectionsBySubject?.data.sections.find(section => {
                    return (
                        String(section.id) ===
                        searchParams.get('sectionsBySubject')
                    );
                })?.children[0]?.id ||
                dataSectionsBySubject?.data.sections[0]?.children[0]?.id ||
                '',
        ),
        limit: 100,
    });

    const { data: dataCustomFeed } = useGetCustomFeedQuery({
        microtopicIds: dataFeedMicrotopics?.data.result.ids || [],
        include: [withPicture ? 'image' : '', withVideo ? 'video' : ''],
        locale,
    });

    const handleChangeFilter = (type?: 'video' | 'image') => {
        if (type === 'image') {
            if (withVideo) {
                setWithPicture(prev => !prev);
            } else {
                if (withPicture) {
                    setWithVideo(true);
                    setWithPicture(false);
                } else {
                    setWithPicture(false);
                }
            }
        } else {
            if (withPicture) {
                setWithVideo(prev => !prev);
            } else {
                if (withVideo) {
                    setWithPicture(true);
                    setWithVideo(false);
                } else {
                    setWithPicture(false);
                }
            }
        }
    };

    const loaderIndicator = useRef(null);

    useEffect(() => {
        setPosts([]);
        setCurrentPage(0);
    }, [locale, refetch]);

    useEffect(() => {
        if (dataFeed) {
            setIsLastPage(dataFeed.data.isLastPage);

            if (dataFeed.data.posts) {
                if (currentPage === 0) {
                    setPosts(dataFeed.data.posts);
                } else {
                    setPosts(prev => {
                        const oldState = [...prev];
                        return [...oldState, ...dataFeed.data.posts];
                    });
                }
            }
        }
    }, [dataFeed]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }, // Порог видимости (от 0 до 1)
        );

        if (loaderIndicator.current) {
            observer.observe(loaderIndicator.current);
        }

        return () => {
            if (loaderIndicator.current) {
                observer.unobserve(loaderIndicator.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible && !isFetching && !isLastPage) {
            setCurrentPage(prev => prev + 1);
        }
    }, [isVisible, isFetching, dataFeed]);

    return (
        <div className={classNames(' min-h-screen', style.wrapper)}>
            <Header />
            <main className="container  grid gap-4  grid-cols-12">
                <nav className=" col-span-2"> Меню боковое </nav>

                <div className=" col-span-6 flex flex-col gap-4">
                    <SubjectsFilter />
                    <div className="flex flex-col gap-4">
                        {searchParams.get('subject') &&
                            dataCustomFeed?.data.data?.map(itemActivityFeed => {
                                return (
                                    <span
                                        className="block h-28"
                                        key={itemActivityFeed.post?.id}
                                    >
                                        {itemActivityFeed.post?.id}
                                    </span>
                                );
                            })}
                        {posts.map(item => {
                            if (item.category === 'image') {
                                return <ImagePost data={item} key={item.id} />;
                            }

                            if (item.category === 'video') {
                                return (
                                    <div key={item.id}>
                                        <VideoPost data={item} />
                                    </div>
                                );
                            }

                            if (item.category === 'activity') {
                                return (
                                    <div className="" key={item.id}>
                                        картинки
                                        <div className=" h-96"></div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div ref={loaderIndicator}> </div>

                    <More />
                </div>

                <aside className=" col-span-4 pt-3">
                    {' '}
                    <WithVideoOrImage
                        handleChangeFilter={handleChangeFilter}
                        withPicture={withPicture}
                        withVideo={withVideo}
                    />{' '}
                    <SectionStatus
                        data={dataSectionsBySubject?.data.sections || []}
                    />
                </aside>
            </main>
        </div>
    );
};

export default Feed;
