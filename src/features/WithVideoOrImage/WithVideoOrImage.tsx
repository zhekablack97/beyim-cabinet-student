import classNames from 'classnames';
import style from './WithVideoOrImage.module.scss';
import { useTranslation } from 'react-i18next';

interface IWithVideoOrImage {
    withVideo?: boolean;
    withPicture?: boolean;
    handleChangeFilter: (type?: 'video' | 'image') => void;
}

export const WithVideoOrImage: React.FC<IWithVideoOrImage> = ({
    withVideo = true,
    withPicture = true,
    handleChangeFilter,
    ...rest
}) => {

    const { t } = useTranslation();
    return (
        <div
            className={classNames(
                style.wrapper,
                ' rounded-xl sticky top-[68px] px-4 py-3 flex flex-col gap-3',
            )}
            {...rest}
        >
            <div className=" w-full">
                <input
                    className="hidden"
                    type="checkbox"
                    checked={withVideo}
                    onChange={() => {
                        handleChangeFilter('video');
                    }}
                    name=""
                    id="videoFilterFeed"
                />
                <label
                    htmlFor="videoFilterFeed"
                    className="flex items-center "
                >
                    <img src="/icons/videoFilter.svg" alt="" className='w-6 h-6 block mr-2' />
                    <span className='text-sm font-semibold cursor-pointer'>{t('feed.video')}</span>
                    <span
                        className={classNames(
                            ' ml-auto w-11 h-6 rounded-3xl flex items-center p-1 duration-200',
                            style.checked,
                        )}
                    />
                </label>
            </div>
            <hr className={classNames('h-[1px]', style.hr)}/>
            <div className="">
                <input
                    className="hidden"
                    type="checkbox"
                    name=""
                    id="pictureFilterFeed"
                    checked={withPicture}
                    onChange={() => {
                        handleChangeFilter('image');
                    }}
                />
                <label
                    className="flex items-center "
                    htmlFor="pictureFilterFeed"
                >
                    <img src="/icons/imageFilter.svg" alt="" className='w-5 h-5 block mr-3' />
                    <span className='text-sm font-semibold cursor-pointer'>{t('feed.picture')}</span>
                    <span
                        className={classNames(
                            'ml-auto w-11 h-6 rounded-3xl flex items-center p-1 duration-200',
                            style.checked,
                        )}
                    />
                </label>
            </div>
        </div>
    );
};
