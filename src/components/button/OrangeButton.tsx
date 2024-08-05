import React from 'react';
import {Button} from "./Button";

interface OrangeButtonProps {
    width?: string,
    children?: React.ReactNode,
    height?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const OrangeButton = (props: OrangeButtonProps) => {

    return (
        <Button color={"linear-gradient(-130deg, #FFDB0A  50%, #FFEE88 50%)"}
                shadow={"shadow-b-button-orange"}
                {...props}>
            {props.children}
        </Button>
    );
};

export default OrangeButton;
