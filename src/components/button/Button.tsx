import React from "react";

interface ButtonPros {
    children: any,
    width?: string,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const Button = ({
                           children, width = "w-sm-button", onClick = () => {
    }
                       }: ButtonPros) => {
    const gradientStyle = {
        background: 'linear-gradient(-130deg, #67EB00 50%, #A6F208 50%)',
        borderRadius: 'inherit',
    };

    const shadowStyle: React.CSSProperties = {
        backgroundColor: '#4EC307',
        borderRadius: 'inherit',
        position: 'absolute',
        inset: "0px 0px 0px",
        zIndex: 1,
    };

    const textStyle: React.CSSProperties = {
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: 500,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        textAlign: 'center',
        height: "100%",
        width: "100%",
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textShadow: '0px 2px 0 rgba(0, 0, 0, 0.1)' // Solid shadow effect
    };

    return (
        <div onClick={onClick}
             className={`relative box-content inline-block ${width} h-[3rem] rounded-button 
                        border-[3px] border-white cursor-pointer overflow-hidden border-box`}>
            <div style={shadowStyle}></div>
            <div className={"relative z-[2]  h-[2.688rem] hover:h-full"} style={gradientStyle}>
                <div style={textStyle}>
                    {children}
                </div>
            </div>
        </div>
    );
}