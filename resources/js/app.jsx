import '../css/app.css';
import './bootstrap.js';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Cv from './pages/Cv';
import Sertifikasi from './pages/Sertifikasi';

const getRoute = () => {
    if (window.location.hash === '#/cv') return 'cv';
    if (window.location.hash === '#/sertifikasi') return 'sertifikasi';
    return 'home';
};

function App() {
    const [route, setRoute] = useState(getRoute);

    useEffect(() => {
        const onHashChange = () => {
            const next = getRoute();
            setRoute(next);
            if (next !== 'home') window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    if (route === 'cv') return <Cv />;
    if (route === 'sertifikasi') return <Sertifikasi />;
    return <Home />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
