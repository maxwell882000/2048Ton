import React from 'react';
import {Button} from "./Button";

interface PlayAgainButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const PlayAgainButton = (props: PlayAgainButtonProps) => {

    return (
        <Button {...props} width={"w-[7.125rem]"} height={"h-[2.5em]"} fontSize={"text-[1rem]"}>
            play again
        </Button>
    );
};

export default PlayAgainButton;
