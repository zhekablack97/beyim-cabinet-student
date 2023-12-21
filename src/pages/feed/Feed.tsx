import { useTranslation } from 'react-i18next';
import { useGetFeedQuery } from '../../api/contentService';
import { Header } from '../../features/Header';
import { SubjectsFilter } from '../../features/SubjectsFilter';
import { date } from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Post } from '../../types/GetContentsResponseApiType';
import { ImagePost } from '../../features/ImagePost';
import Modal from 'react-modal';
import classNames from 'classnames';

const Feed: React.FC = () => {
    const { t, i18n } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;
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
    const loaderIndicator = useRef(null);

    useEffect(() => {
        // console.log(currentPage, 'currentPage');
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
        <div className="bg-slate-200 min-h-screen">
            <Header />
            <main className="container  grid gap-4  grid-cols-12">
                <nav className=" col-span-2">Меню боковое </nav>

                <div className=" col-span-6 flex flex-col gap-4">
                    <SubjectsFilter />
                    <div className="flex flex-col gap-4">
                        {posts.map(item => {
                            if (item.category === 'image') {
                                return <ImagePost data={item} key={item.id} />;
                            }

                            if (item.category === 'video') {
                                return (
                                    <div className="" key={item.id}>
                                        Видео
                                        <div className=" h-96"></div>
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
                    <div ref={loaderIndicator}>aaaaaaaaaaaaa</div>
                </div>

                <aside className=" col-span-4">статус бар</aside>
            </main>
        </div>
    );
};

export default Feed;
