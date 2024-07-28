import {useUnit} from "effector-react";
import {$navigation} from "../../states/store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const Routing = () => {
    const [navigation] = useUnit([$navigation])
    const navigate = useNavigate();
    useEffect(() => {
        console.log(`NAVIGATION IS MADEDED ${navigation}`);
        navigate(navigation)
    }, [navigation])
    return <></>
}