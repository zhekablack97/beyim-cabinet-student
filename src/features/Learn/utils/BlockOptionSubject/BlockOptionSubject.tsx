import classNames from 'classnames';
import style from './BlockOptionSubject.module.scss';
import { Option } from '../Option';
import {
    GetSectionsResponseApiType,
    GetSubjectResponseApiType,
} from '../../../../types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface IBlockOption<
    T = GetSubjectResponseApiType | GetSectionsResponseApiType,
> {
    title?: string;
    withImage?: boolean;
    data?: T;
    isLoading?: boolean;
    active?: string;
    handleChange?: (id: string) => void;
}

export const BlockOptionSubject: React.FC<
    IBlockOption<GetSubjectResponseApiType>
> = ({
    title,
    withImage = false,
    data,
    isLoading = true,
    active,
    handleChange,
    ...props
}) => {
    const { i18n } = useTranslation();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

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
                        data.data.subjects?.map(item => {
                            return (
                                <Option
                                    key={item.id}
                                    name={
                                        item.translations.find(
                                            element =>
                                                element.locale === locale,
                                        )?.name
                                    }
                                    handleClick={() => {
                                        if (handleChange) {
                                            handleChange(String(item.id));
                                        }
                                    }}
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
