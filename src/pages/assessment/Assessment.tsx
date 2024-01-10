import classNames from 'classnames';
import { AssessmentHeader } from '../../features/AssessmentHeader';
import { ButtonNode } from '../../features/AssessmentHeader/utils/ButtonNode';
import style from './Assessment.module.scss';
import { AssessmentStarting } from '../../features/AssessmentStarting';
const Assessment: React.FC = () => {
    return (
        <div className={classNames(' min-h-screen', style.wrapper)}>
            <AssessmentHeader buttonNode={<ButtonNode />} />
            <main className={style.root}>
                <AssessmentStarting />
            </main>
        </div>
    );
};

export default Assessment;
