import './App.scss';

import Authorization from './pages/authorization';

import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { login } from './features/slice/authSlice';
import Feed from './pages/feed';
import More from './pages/feed/more';
import Onboarding from './pages/onboarding';
import Favorites from './pages/favorites';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const coocieData = Cookies.get('access_token');

        if (coocieData) {
            dispatch(login());
        }
    }, []);

    return (
        <Routes>
            <Route path="/">
                <Route index element={<Authorization />} />
                <Route path="/onboarding">
                    <Route index element={<Onboarding />} />
                </Route>
                <Route path="/sss">
                    <Route index element={<div>sss</div>} />
                    <Route path="aaaa" element={<div>aaaa11aa1</div>} />
                    {/* Using path="*"" means "match anything", so this route
      acts like a catch-all for URLs that we don't have explicit
      routes for. */}
                </Route>
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/feed">
                    <Route index element={<Feed />} />
                    {/* <Route path="/favorites" element={<div>xxx</div>} /> */}
                </Route>

                <Route path="*" element={<div>страница ошибки </div>} />
            </Route>
        </Routes>
    );
}

export default App;
