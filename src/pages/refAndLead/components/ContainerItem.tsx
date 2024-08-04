import React from "react";

interface ContainerItemProps {
    children: React.ReactNode;
    bgColor?: string;
    align?: string;
}

export const ContainerItem = ({bgColor = "bg-white", align = "justify-between", children}: ContainerItemProps) => {
    return <div className={`${bgColor} h-[4.5rem] py-1 px-4  w-full rounded-[1.313rem] shadow-b-container`}>
        <div className={`flex h-full ${align} items-center`}>
            {children}
        </div>
    </div>
}