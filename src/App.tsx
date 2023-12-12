import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.scss';

const Tittle: React.FC = () => {
    const { t } = useTranslation('translation');

    return <h1>{t('authorization.title')}</h1>;
};

function App() {
    return (
        <Suspense fallback="...loading">
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
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
}

export default App;
