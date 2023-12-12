import { Suspense } from "react";
import { useTranslation } from 'react-i18next';

const Tittle: React.FC = () => {
    const { t } = useTranslation('translation');

    return <h1>{t('authorization.title')}</h1>;
};


const Authorization: React.FC = () => {
    return (
        <Suspense fallback="...loading">
            <div className="App">
                <header className="App-header">
                   
                    <Tittle />
                    <p>aa</p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </Suspense>
    );
};

export default Authorization;
