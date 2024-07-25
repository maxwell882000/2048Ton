import React from "react";
import {Button} from "./Button";
import {HomeIcon} from "../icons/HomeIcon";
import {Link} from "react-router-dom";


export const HomeButton = () => {
    return <Link to="/2048Ton/">
        <Button width={"w-[2.5em]"} height={"h-[2.5em]"} fontSize={"text-[1rem]"} color={"#FFDB0A"}
                shadow={"shadow-b-button-orange"}>
            <div className="flex flex-row justify-center items-center"><HomeIcon></HomeIcon></div>
        </Button>
    </Link>

}