import { ReactNode } from 'react';
import style from './AssessmentHeader.module.scss';
import classNames from 'classnames';
export interface IAssessmentHeaderProps {
    buttonNode?: ReactNode;
    assessmentProperties?: ReactNode;
    icons?: ReactNode;
    center?: ReactNode;
    typePost?: ReactNode;
    className?: string;
}

export const AssessmentHeader = ({
    buttonNode,
    assessmentProperties,
    icons,
    center,
    typePost,
    className,
}: IAssessmentHeaderProps) => {
    return (
        <header
            className={classNames(
                `flex items-center justify-between ${className}`,
                style.headerAssessment,
            )}
        >
            {center}
            <aside
                className={classNames(
                    'flex gap-28 justify-center items-center',
                )}
            >
                {buttonNode}
                {typePost}
                {assessmentProperties}
            </aside>
            {icons}
        </header>
    );
};
