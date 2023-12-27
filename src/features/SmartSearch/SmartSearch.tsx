import classNames from 'classnames';
import style from './SmartSearch.module.scss';
import ReactModal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import {
    useGetAllSubjectsQuery,
    useGetSearchGlobalQuery,
} from '../../api/programService';
import { useTranslation } from 'react-i18next';
import { useGetFeedQuery } from '../../api/contentService';
import { SearchItem } from '../SearchItem/SearchItem';
import { useSearchParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EmptyResult } from './utils';

type TypeInclude = 'video' | 'image';

interface IFilter {
    subjects: string[];
    typeResources: TypeInclude[];
    locale: 'kk' | 'ru' | 'en';
}

export const SmartSearch: React.FC = () => {
    const { t, i18n } = useTranslation(); //локализация

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language; //текущий язык

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    const openId = searchParams.get('idContent');
    const { data: subjects, isFetching: isFetchingSubjects } =
        useGetAllSubjectsQuery({ limit: 100 });
    const [filter, setFilter] = useState<IFilter>();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue: setValueFilter,
        formState: { errors },
    } = useForm<IFilter>();

    const onSubmit: SubmitHandler<IFilter> = data => {
        setFilter(data);
    };

    const { data: dataIdSearch, isFetching: isFetchingId } =
        useGetSearchGlobalQuery({
            input: value,
        });

    const { data: dataContentSearch, isFetching: isFetchingContent } =
        useGetFeedQuery({
            limit: 1000,
            microtopicIds: dataIdSearch?.data.result || [],
            subjectIds: filter?.subjects.filter(item => item),
            locale: filter?.locale ? filter?.locale : locale,
            typeResources: filter?.typeResources
                ? filter?.typeResources.filter(item => item)
                : [],
        });

    useEffect(() => {
        if (value != '') {
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
            if (inputRef) {
                inputRef.current?.focus();
            }
        } else {
            setIsOpen(false);
            document.body.style.overflow = 'visible';
        }
    }, [value]);

    //нужно для того что бы отслеживать открывался пост подробнее или нет, это помогает исправлять скролл страницы
    useEffect(() => {
        if (value != '') {
            if (!searchParams.get('idContent')) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            setIsOpen(false);
        }
    }, [openId, document.body.style.overflow]);

    useEffect(() => {
        setValueFilter('locale', locale);
    }, [locale]);

    return (
        <div className="max-w-[244px] w-full">
            <input
                type="text"
                className={classNames(
                    'block w-full h-8 text-sm  border-0 rounded-lg p-2',
                    style.input,
                )}
                value={value}
                ref={inputRef}
                onChange={e => {
                    const value = e.target.value;
                    setValue(value || '');
                }}
                placeholder={t('search.placeholder')}
            />
            <ReactModal
                isOpen={true}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                shouldCloseOnEsc={false}
                style={{
                    overlay: {
                        backgroundColor: '#E9F0F3',
                        zIndex: 100,
                        padding: 0,
                        top: 56,
                        height: isOpen ? 'calc(100vh - 56px)' : 0,
                        opacity: isOpen ? 1 : 0,
                    },
                    content: {
                        inset: 0,
                        backgroundColor: '#E9F0F3',
                        border: 0,
                        overflow: isOpenGallery ? 'hidden' : 'auto',
                        padding: 0,
                        height: isOpen ? 'calc(100vh - 56px)' : 0,
                    },
                }}
            >
                {isFetchingContent || isFetchingId ? (
                    <div
                        className={classNames(
                            'container  grid gap-4 pt-6 grid-cols-12',
                        )}
                    >
                        Идет поиск
                    </div>
                ) : (
                    <div
                        className={classNames(
                            'container  grid gap-4 pt-6 grid-cols-12',
                        )}
                    >
                        {dataIdSearch?.data.result.length === 0 ? (
                            <EmptyResult value={value} />
                        ) : (
                            <div className="col-span-8 col-start-3 flex gap-4 flex-col">
                                <div className="z-[1000] relative flex justify-between">
                                    <h2
                                        className={classNames(
                                            'text-xl font-medium',
                                        )}
                                    >
                                        {(dataContentSearch?.data.posts &&
                                            dataContentSearch?.data.posts
                                                .length) ||
                                            0}{' '}
                                        {t('search.empty.valueTitleFirst')}{' '}
                                        <span
                                            className={classNames(
                                                'text-xl font-medium',
                                                style.blue,
                                            )}
                                        >
                                            {' '}
                                            &quot;{value}&quot;
                                        </span>
                                        <span className="text-xl font-medium">
                                            {' '}
                                            {t('search.empty.valueTitleSecond')}
                                        </span>
                                    </h2>
                                    <div>
                                        <button
                                            className={classNames(
                                                'flex px-6 items-center gap-1 rounded-xl border-2 h-10',
                                                style.buttonFilter,
                                            )}
                                            data-tooltip-id="filter-search"
                                            data-tooltip-offset={8}
                                        >
                                            <img
                                                src="/icons/filter.svg"
                                                alt=""
                                            />
                                            <span className="text-base">
                                                {t('search.filter.title')}
                                            </span>
                                        </button>
                                        <Tooltip
                                            id="filter-search"
                                            openOnClick={true}
                                            clickable={true}
                                            noArrow={true}
                                            opacity={1}
                                            place={'bottom-end'}
                                            className={classNames(
                                                style.wrapperFilter,
                                            )}
                                        >
                                            <aside
                                                className={classNames(
                                                    'px-4 pt-5 rounded-2xl max-w-[393px] border-2',
                                                    style.blockFilter,
                                                )}
                                            >
                                                <form
                                                    action=""
                                                    onSubmit={handleSubmit(
                                                        onSubmit,
                                                    )}
                                                >
                                                    <h2 className="text-lg font-bold mb-[12px]">
                                                        {t(
                                                            'search.filter.title',
                                                        )}
                                                    </h2>
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                style.blue,
                                                                'text-sm font-medium mb-4 block',
                                                            )}
                                                        >
                                                            {t(
                                                                'search.filter.subjects',
                                                            )}
                                                        </span>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {subjects?.data.subjects.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={`${item.id}-subject-filter`}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                {...register(
                                                                                    `subjects.${index}`,
                                                                                )}
                                                                                id={`subjects.${index}`}
                                                                                value={
                                                                                    item.id
                                                                                }
                                                                                className={classNames(
                                                                                    'hidden',
                                                                                    style.input,
                                                                                )}
                                                                            />
                                                                            <label
                                                                                className={classNames(
                                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                                    style.label,
                                                                                )}
                                                                                htmlFor={`subjects.${index}`}
                                                                            >
                                                                                <span className="text-sm leading-none font-medium">
                                                                                    {
                                                                                        item.translations.find(
                                                                                            localeItem => {
                                                                                                return (
                                                                                                    localeItem.locale ===
                                                                                                    locale
                                                                                                );
                                                                                            },
                                                                                        )
                                                                                            ?.name
                                                                                    }
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={classNames(
                                                                style.blue,
                                                                'text-sm font-medium mb-4 block',
                                                            )}
                                                        >
                                                            {t(
                                                                'search.filter.type',
                                                            )}
                                                        </span>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            <input
                                                                type="checkbox"
                                                                {...register(
                                                                    `typeResources.0`,
                                                                )}
                                                                value={'image'}
                                                                className={classNames(
                                                                    'hidden',
                                                                    style.input,
                                                                )}
                                                                id={`typeResources.0`}
                                                            />
                                                            <label
                                                                className={classNames(
                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                    style.label,
                                                                )}
                                                                htmlFor={`typeResources.0`}
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'search.filter.picture',
                                                                    )}
                                                                </span>
                                                            </label>
                                                            <input
                                                                className={classNames(
                                                                    'hidden',
                                                                    style.input,
                                                                )}
                                                                type="checkbox"
                                                                {...register(
                                                                    `typeResources.1`,
                                                                )}
                                                                value={'video'}
                                                                id={`typeResources.1`}
                                                            />
                                                            <label
                                                                className={classNames(
                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                    style.label,
                                                                )}
                                                                htmlFor={`typeResources.1`}
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'search.filter.video',
                                                                    )}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="mb-4">
                                                        <span
                                                            className={classNames(
                                                                style.blue,
                                                                'text-sm font-medium mb-4 block',
                                                            )}
                                                        >
                                                            {t(
                                                                'search.filter.language',
                                                            )}
                                                        </span>
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            <input
                                                                id="locale-kk"
                                                                className={classNames(
                                                                    'hidden',
                                                                    style.input,
                                                                )}
                                                                type="radio"
                                                                {...register(
                                                                    `locale`,
                                                                )}
                                                                value={'kk'}
                                                            />
                                                            <label
                                                                className={classNames(
                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                    style.label,
                                                                )}
                                                                htmlFor="locale-kk"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'search.filter.kk',
                                                                    )}
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="radio"
                                                                {...register(
                                                                    `locale`,
                                                                )}
                                                                className={classNames(
                                                                    'hidden',
                                                                    style.input,
                                                                )}
                                                                value={'ru'}
                                                                id="locale-ru"
                                                            />
                                                            <label
                                                                className={classNames(
                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                    style.label,
                                                                )}
                                                                htmlFor="locale-ru"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'search.filter.ru',
                                                                    )}
                                                                </span>
                                                            </label>

                                                            <input
                                                                id="locale-en"
                                                                className={classNames(
                                                                    'hidden',
                                                                    style.input,
                                                                )}
                                                                type="radio"
                                                                {...register(
                                                                    `locale`,
                                                                )}
                                                                value={'en'}
                                                            />
                                                            <label
                                                                className={classNames(
                                                                    'gap-1 rounded-xl px-3 py-2 cursor-pointer border-2 border-solid flex h-8 items-center',
                                                                    style.label,
                                                                )}
                                                                htmlFor="locale-en"
                                                            >
                                                                <span>
                                                                    {t(
                                                                        'search.filter.en',
                                                                    )}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="button"
                                                            onClick={handleSubmit(
                                                                onSubmit,
                                                            )}
                                                            className={classNames(
                                                                'rounded-2xl w-full h-10 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] mb-1 p-3',
                                                                style.apply,
                                                            )}
                                                        >
                                                            {t(
                                                                'search.filter.apply',
                                                            )}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={classNames(
                                                                'rounded-2xl w-full h-10 items-center flex justify-center uppercase text-xs font-bold min-w-[132px] tracking-[1px] p-3',
                                                                style.clear,
                                                            )}
                                                            onClick={() => {
                                                                reset();
                                                            }}
                                                        >
                                                            {t(
                                                                'search.filter.resetFilter',
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </aside>
                                        </Tooltip>
                                    </div>
                                </div>

                                {dataContentSearch?.data.posts !== null &&
                                    dataContentSearch?.data.posts?.map(item => {
                                        return (
                                            <SearchItem
                                                key={item.id}
                                                data={item}
                                                openGallery={() => {
                                                    setIsOpenGallery(true);
                                                }}
                                                closeGallery={() =>
                                                    setIsOpenGallery(false)
                                                }
                                            />
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                )}
            </ReactModal>
        </div>
    );
};
