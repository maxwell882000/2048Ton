import React from 'react';
import OrangeButton from "./OrangeButton";

interface ContinueGameButtonProps {
    width?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const ContinueGameButton = (props: ContinueGameButtonProps) => {

    return (
        <OrangeButton
            {...props}>
            continue
        </OrangeButton>
    );
};

export default ContinueGameButton;
