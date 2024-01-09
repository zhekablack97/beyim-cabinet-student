//@ts-ignore
import React, { ReactNode } from 'react';
//@ts-ignore
interface AssessmentBlockFooterProps {
    //@ts-ignore
    children: any;
}

export const AssessmentBlockFooter: React.FC<AssessmentBlockFooterProps> = ({
    children,
}) => {
    return <footer id="step-12">{children}</footer>;
};
