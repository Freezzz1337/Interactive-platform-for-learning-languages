import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./error-boundary/error-boundary";
import {BrowserRouter as Router} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Router>
                <App/>
            </Router>
        </ErrorBoundary>
    </React.StrictMode>
);

