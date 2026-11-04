import '../css/app.css';
import './bootstrap.js';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Cv from './pages/Cv';

const getRoute = () => (window.location.hash === '#/cv' ? 'cv' : 'home');

function App() {
    const [route, setRoute] = useState(getRoute);

    useEffect(() => {
        const onHashChange = () => {
            const next = getRoute();
            setRoute(next);
            if (next === 'cv') window.scrollTo(0, 0);
        };

        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return route === 'cv' ? <Cv /> : <Home />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
