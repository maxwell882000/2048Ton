import {HomeContainer} from "./components/HomeContainer";
import PlayButton from "../../components/button/PlayButton";
import React from "react";
import {Link} from "react-router-dom";
import PlayAgainButton from "../../components/button/PlayAgain";

export const HomePage = () => {
    return (
        <>
            <HomeContainer></HomeContainer>
            <div className="mt-6"></div>
            <Link to="/2048Ton/game">
                <PlayButton width={'w-lg-button'}></PlayButton>
            </Link>
        </>
    )
}