import { useTranslation } from 'react-i18next';
import './App.scss';

import Authorization from './pages/authorization';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function App() {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    useEffect(() => {
        const isLogin = Cookies.get('access_token');

        if (isLogin) {
            setIsLogin(true);
        }
    }, []);

    return (
        <Routes>
            <Route path="/">
                <Route index element={<Authorization />} />
                {isLogin && (
                    <>
                        <Route path="/sss">
                            <Route index element={<div>sss</div>} />
                            <Route path="aaaa" element={<div>aaaa11aa1</div>} />
                            {/* Using path="*"" means "match anything", so this route
      acts like a catch-all for URLs that we don't have explicit
      routes for. */}
                        </Route>
                        <Route path="/about" element={<div>about</div>} />
                    </>
                )}
                <Route path="*" element={<div>страница ошибки </div>} />
            </Route>
        </Routes>
    );
}

export default App;
