import classNames from 'classnames';
import style from './SmartSearch.module.scss';
import ReactModal from 'react-modal';
import { useEffect, useRef, useState } from 'react';
import { useGetSearchGlobalQuery } from '../../api/programService';
import { useTranslation } from 'react-i18next';
import { useGetFeedQuery } from '../../api/contentService';
import { SearchItem } from '../SearchItem/SearchItem';

export const SmartSearch: React.FC = () => {
    const { t, i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { data: dataIdSearch, isFetching: isFetchingId } =
        useGetSearchGlobalQuery({
            locale: locale,
            input: value,
        });
    const { data: dataContentSearch, isFetching: isFetchingContent } =
        useGetFeedQuery({
            limit: 1000,
            locale: locale,
            microtopicIds: dataIdSearch?.data.result || [],
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

    console.log(dataContentSearch, 'dataIdSearch');

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
                placeholder="Поиск"
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
                        padding: 0,
                        height: isOpen ? 'calc(100vh - 56px)' : 0,
                    },
                }}
            >
                {isFetchingContent || isFetchingId ? (
                    <div>Идет поиск</div>
                ) : (
                    <div
                        className={classNames(
                            'container  grid gap-4 pt-6 grid-cols-12',
                        )}
                    >
                        {dataIdSearch?.data.result.length === 0 ? (
                            <div className="col-span-8 col-start-3 flex gap-4 flex-col">Нету результатов по этому запросу </div>
                        ) : (
                            <div className="col-span-8 col-start-3 flex gap-4 flex-col">
                                {dataContentSearch?.data.posts?.map(item => {
                                    return (
                                        <SearchItem key={item.id} data={item} />
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
