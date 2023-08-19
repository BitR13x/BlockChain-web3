import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import App from './App';
import Dashboard from "./pages/Dashboard";
import BlockAuth from "./pages/BlockAuth";
import User from './pages/User';
import NoMatch from "./pages/NoMatch";


const Router = createBrowserRouter([
    {
        path: "/signin",
        element: <BlockAuth />,
    },
    {
        path: "/user-settings",
        element: <User />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "*",
        element: <NoMatch />,
    }
]);

export default Router;