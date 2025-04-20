import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./error-boundary/error-boundary";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from "./context/auth-context";
import {FolderProvider} from "./context/folder-context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <AuthProvider>
                <FolderProvider>
                    <Router>
                        <App/>
                    </Router>
                </FolderProvider>
            </AuthProvider>
        </ErrorBoundary>
    </React.StrictMode>
);

