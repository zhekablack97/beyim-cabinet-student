import { Link } from 'react-router-dom';
import { ChangingLanguage } from '../ChangingLanguage';
import style from './Header.module.scss';
import classNames from 'classnames';
import { Learn } from '../Learn';
import { SmartSearch } from '../SmartSearch';

export const Header: React.FC = () => {
    return (
        <header
            className={classNames(
                'h-14 flex px-6 items-center  z-10 sticky top-0',
                style.wrapper,
            )}
        >
            <div>
                <Link to="/">
                    <img src="/icons/logoMain.svg" alt="" />
                </Link>
            </div>
            <Learn className={classNames('ml-[49px] ')} />
            <div className="ml-7">
                <SmartSearch />
            </div>
            <div className="ml-auto flex items-center">
                <ChangingLanguage />
                <div>пожаловаться</div>
                <div>Профаил</div>
            </div>
        </header>
    );
};
