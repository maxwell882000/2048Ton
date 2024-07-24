import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {HomePage} from "./pages/home/HomePage";
import GamePage from "./pages/game/GamePage";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/game",
        element: <GamePage/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <App>
        <RouterProvider router={router}/>
    </App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
