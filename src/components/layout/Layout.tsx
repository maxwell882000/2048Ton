import {ReactNode, useEffect} from "react";
import {useUnit} from "effector-react";
import {$navigation} from "../../states/store";
import {useNavigate} from "react-router-dom";

interface LayoutPros {
    children: ReactNode;
}

export const Layout = ({children}: LayoutPros) => {
    const style = {
        background: 'radial-gradient(circle, #A659FE 0%, #6F53FD 100%)'
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen"
             style={style}>{children}</div>
    )
}