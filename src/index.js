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
import {OutEnergy} from "./pages/outenergy/OutEnergy";

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
            {
                path: Pages.OUTENERGY,
                element: <OutEnergy/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        {/*<TonConnectUIProvider manifestUrl="https://maxwell882000.github.io/2048Ton/tonconnect-manifest.json">*/}
        <RouterProvider router={router}>
        </RouterProvider>
        {/*</TonConnectUIProvider>*/}
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
