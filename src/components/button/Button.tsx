import React from "react";

interface ButtonPros {
    children: any,
    width?: string,
    height?: string,
    fontSize?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
    color?: string,
    shadow?: string,
}

export const Button = ({
                           children,
                           onClick,
                           width = "w-lg-button",
                           height = "h-[3.313rem]",
                           fontSize = "text-[1.5rem]",
                           color = 'linear-gradient(-130deg, #67EB00 50%, #A6F208 50%)',
                           shadow = 'shadow-b-button',

                       }: ButtonPros) => {
    const gradientStyle = {
        background: color,
    };
    const textShadow = {
        textShadow: '0px 2px 0 rgba(0, 0, 0, 0.1)'
    }
    return (
        <button onClick={onClick} style={gradientStyle} className={`
        relative inline-block ${width} ${height} rounded-button
        border-[3px] border-white cursor-pointer overflow-hidden border-box ${shadow} hover:shadow-b-button-hover `}>
          <span className={`text-white flex justify-center items-center w-full h-full uppercase ${fontSize}`} style={textShadow}>
                      {children}
          </span>

        </button>
    )
}