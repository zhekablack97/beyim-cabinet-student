import { Link } from 'react-router-dom';
import { ChangingLanguage } from '../ChangingLanguage';
import style from './Header.module.scss';
import classNames from 'classnames';
import { Learn } from '../Learn';

export const Header: React.FC = () => {
    return (
        <header className={classNames("h-14 flex px-6 items-center", style.wrapper)}>
            <div>
                <Link to="/">
                    <img src="/icons/logoMain.svg" alt="" />
                </Link>
            </div>
            <Learn className={classNames('ml-[77px] ')} />
            <div className="ml-7">поиск</div>
            <div className="ml-auto flex items-center">
                <ChangingLanguage />
                <div>пожаловаться</div>
                <div>Профаил</div>
            </div>
        </header>
    );
};
