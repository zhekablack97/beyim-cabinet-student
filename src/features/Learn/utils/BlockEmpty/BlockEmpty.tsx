import classNames from 'classnames';
import style from './BlockEmpty.module.scss';
import { useTranslation } from 'react-i18next';

export const BlockEmpty: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-center flex-col max-h-full text-center mt-[calc(50%)] ">
            <img
                src="/icons/emptyLearn.svg"
                alt="Empty Learn"
                className="mb-2 block w-8 h-8"
            />

            <span className={classNames('text-sm font-semibold', style.text)}>
                {t('header.blockEmpty.title')}
            </span>
            <span className={classNames(style.text)}>
                {t('header.blockEmpty.description')}
            </span>
        </div>
    );
};
