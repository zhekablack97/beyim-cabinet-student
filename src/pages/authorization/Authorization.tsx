import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const Tittle: React.FC = () => {
    const { t } = useTranslation('translation');

    return (
        <h1 className="text-3xl font-bold underline">
            {t('authorization.title')}
        </h1>
    );
};

const Authorization: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>About - yoursite.com</title>
                <meta name="description" content="Lorem ipsum dolor sit amet" />
            </Helmet>
            <Suspense fallback="...loading">
                <div>
                    <header className="App-header">
                        <div>лого</div>
                        <div>Переключение языка</div>
                    </header>
                    <main>
                        <h1>Войти</h1>
                        <p>Войдите используя запись Active Directory</p>
                    </main>
                    <footer>© 2023 Beyim Tech</footer>
                </div>
            </Suspense>
        </>
    );
};

export default Authorization;
