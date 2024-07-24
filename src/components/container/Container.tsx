import {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
}

export const Container = ({children}: ContainerProps) => {
    return (
        <div className="rounded-container bg-white w-[16rem] h-[13.438rem] p-[0.844rem] box-border"
             style={{boxShadow: "0 0.25rem 0px rgba(0, 0, 0, 0.25), 0 -0.25rem 0px #D1D8FF inset"}}>
            {children}
        </div>
    )
}