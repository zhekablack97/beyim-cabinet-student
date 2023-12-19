import classNames from 'classnames';
import style from './BlockOption.module.scss';
import { Option } from '../Option';
import { GetSubjectResponseApiType } from '../../../../types';
import { useTranslation } from 'react-i18next';

interface IBlockOption {
    title?: string;
    withImage?: boolean;
    data?: GetSubjectResponseApiType;
    isLoading?: boolean;
    active?: string;
}

export const BlockOption: React.FC<IBlockOption> = ({
    title,
    withImage = false,
    data,
    isLoading = true,
    active,
    ...props
}) => {
    const { i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    const [active, ]

    return (
        <div
            className={classNames(
                'min-h-[516px] py-4 px-3 w-[216px]',
                style.wrapper,
            )}
            {...props}
        >
            <span className={classNames(style.title, 'text-sm mb-6 block')}>
                {title}
            </span>
            <div>
                <ul>
                    {data &&
                        data.data.subjects.map(item => {
                            return (
                                <Option
                                    key={item.id}
                                    name={
                                        item.translations.find(
                                            element =>
                                                element.locale === locale,
                                        )?.name
                                    }
                                    handleClick={}
                                    imageSrc={item.icon_url}
                                    isActive={active === String(item.id)}
                                />
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};
