import Container from "../../containers/container";
import {useEffect} from "react";

export const useInitial = () => {
    const boardService = Container.getBoardService();

    useEffect(() => {
        // get board and positional board after reentering the game from tg
        // stay on the loading page, after it was decided save changes and go to the game
    }, [])
}