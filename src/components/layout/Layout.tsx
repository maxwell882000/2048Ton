import {ReactNode} from "react";

interface LayoutPros {
    children: ReactNode;
}

export const Layout = ({children}: LayoutPros) => {
    const style = {
        background: 'radial-gradient(circle, #A659FE 0%, #6F53FD 100%)'
    }
    return (
        <div
            className="flex flex-col checl justify-center items-center h-[100dvh]"
            style={style}>{children}
        </div>
    )
}