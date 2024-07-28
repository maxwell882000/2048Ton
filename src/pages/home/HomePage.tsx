import {HomeContainer} from "./components/HomeContainer";
import PlayButton from "../../components/button/PlayButton";
import React from "react";
import {useStart} from "../../hooks/useStart";

export const HomePage = () => {
    const {startGame} = useStart();

    return (
        <>
            <HomeContainer></HomeContainer>
            <div className="mt-6"></div>
            <PlayButton onClick={startGame} width={'w-lg-button'}></PlayButton>
        </>
    )
}