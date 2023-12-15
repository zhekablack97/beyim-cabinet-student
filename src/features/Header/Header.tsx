import { Link } from 'react-router-dom';
import { ChangingLanguage } from '../ChangingLanguage';

export const Header: React.FC = () => {
    return (
        <header className="h-14 flex px-6 items-center">
            <div>
                <Link to="/">
                    <img src="/icons/logoMain.svg" alt="" />
                </Link>
            </div>
            <div className="ml-[77px]">Изучить</div>
            <div className="ml-7">поиск</div>
            <div className="ml-auto flex items-center">
                <ChangingLanguage />
                <div>пожаловаться</div>
                <div>Профаил</div>
            </div>
        </header>
    );
};
