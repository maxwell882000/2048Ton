import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {HomePage} from "./pages/home/HomePage";
import GamePage from "./pages/game/GamePage";
import App from "./App";
import {Pages} from "./constants/pages";
import {Start} from "./pages/start/Start";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: Pages.START,
                element: <Start/>,
            },
            {
                path: Pages.HOME,
                element: <HomePage/>,
            },
            {
                path: Pages.GAME,
                element: <GamePage/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        <RouterProvider router={router}>
        </RouterProvider>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
