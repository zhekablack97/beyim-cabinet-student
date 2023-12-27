import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useSearchParams } from 'react-router-dom';
import { HeaderMore } from '../../../features/HeaderMore';
import style from './More.module.scss';
import classNames from 'classnames';
import {
    useGetOnePostQuery,
    useGetOneQuery,
} from '../../../api/contentService';

const More: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const openId = searchParams.get('idContent');

    // const { data: dataPost } = useGetOnePostQuery(openId || '');
    const { data: dataContent } = useGetOneQuery(openId || '');
    const openModal = () => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsOpen(false);

        if (!searchParams.get('fromSearch')) {
            document.body.style.overflow = 'visible';
        }
        setSearchParams(prev => {
            return {
                idContent: '',
                fromSearch: '',
                subject: prev.get('subject') || '',
                sectionsBySubject: prev.get('sectionsBySubject') || '',
                them: prev.get('them') || '',
            };
        });
    };

    useEffect(() => {
        if (searchParams.get('idContent')) {
            openModal();
        } else {
            closeModal();
        }
    }, [openId]);

    return (
        <div>
            <ReactModal
                isOpen={isOpen}
                shouldCloseOnOverlayClick={false}
                ariaHideApp={false}
                shouldCloseOnEsc={false}
                style={{
                    overlay: {
                        backgroundColor: '#E9F0F3',
                        zIndex: 2001,
                        padding: 0,
                    },
                    content: {
                        inset: 0,
                        backgroundColor: '#E9F0F3',
                        border: 0,
                        padding: 0,
                        height: '100vh',
                    },
                }}
            >
                <>
                    <HeaderMore
                        title={String(dataContent?.data.content.subjectId)}
                        subTitle={dataContent?.data.content.description}
                        onBack={closeModal}
                    />
                    <div
                        className={classNames(
                            'container  grid gap-4 pt-6 grid-cols-12',
                        )}
                    >
                        <div
                            className={classNames(
                                'col-span-8 col-start-3 rounded-2xl p-10',
                                style.content,
                            )}
                        >
                            {dataContent?.data.content.body}
                        </div>
                    </div>
                </>
            </ReactModal>
        </div>
    );
};

export default More;
