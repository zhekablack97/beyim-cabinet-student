import { ChangingLanguage } from '../ChangingLanguage';

export const Header: React.FC = () => {
    return (
        <header>
            <div>лого</div>
            <div>Изучить</div>
            <div>поиск</div>
            <ChangingLanguage />
            <div>пожаловаться</div>
            <div>Профаил</div>
        </header>
    );
};
