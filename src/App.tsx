import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.scss';

import Authorization from './pages/authorization';

import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Authorization />} />
                <Route path="/sss">
                    <Route index element={<div>sss</div>} />
                    <Route path="aaaa" element={<div>aaaa11aa1</div>} />
                    {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
                </Route>
                <Route path="/about" element={<div>about</div>} />
            </Route>
        </Routes>
    );
}

export default App;
