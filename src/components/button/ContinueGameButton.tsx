import React from 'react';
import {Button} from "./Button";

interface ContinueGameButtonProps {
    width?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const ContinueGameButton = (props: ContinueGameButtonProps) => {

    return (
        <Button color={"linear-gradient(-130deg, #FFDB0A  50%, #FFEE88 50%)"}
                shadow={"shadow-b-button-orange"}
                {...props}>
            continue
        </Button>
    );
};

export default ContinueGameButton;
