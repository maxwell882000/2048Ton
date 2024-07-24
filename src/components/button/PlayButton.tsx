import React from 'react';
import {Button} from "./Button";

interface PlayButtonProps {
    width?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const PlayButton = (props: PlayButtonProps) => {

    return (
        <Button {...props}>
            play
        </Button>
    );
};

export default PlayButton;
