import { useTranslation } from 'react-i18next';
import { Section } from '../../../../types/GetSectionBySubjectsApiResponseApiType';
import { useSearchParams } from 'react-router-dom';
import style from './SectionBlock.module.scss';
import classNames from 'classnames';

interface ISectionBlock {
    item: Section;
    isHidden?: boolean;
}

export const SectionBlock: React.FC<ISectionBlock> = ({
    item,
    isHidden = false,
    ...props
}) => {
    const { i18n } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const locale = i18n.translator.language;

    return (
        <h3
           
            className={classNames(
                style.nameSection,
                isHidden && 'hidden',
                'mb-3',
                'font-semibold',
            )}
            {...props}
        >
            {
                item.translations.find(translation => {
                    return translation.locale === locale;
                })?.name
            }
        </h3>
    );
};

/**
 * логика для переключение на раздел
 */
// onClick={() => {
//     setSearchParams(prev => {
//         return {
//             idContent: prev.get('idContent') || '',
//             fromSearch: prev.get('fromSearch') || '',
//             subject: prev.get('subject') || '',
//             sectionsBySubject: String(item.id) || '',
//             them: '',
//         };
//     });
// }}
