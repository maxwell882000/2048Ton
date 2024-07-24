import {HomeContainer} from "./components/HomeContainer";
import PlayButton from "../../components/button/PlayButton";
import React from "react";
import {Link} from "react-router-dom";

export const HomePage = () => {
    return (
        <>
            <HomeContainer></HomeContainer>
            <div className="mt-6"></div>
            <Link to="/game">
                <PlayButton width={'w-lg-button'}></PlayButton>
            </Link>
        </>
    )
}