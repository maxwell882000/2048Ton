import {useUnit} from "effector-react";
import {$navigation} from "../../states/store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {$pageChanged} from "../../states/events";
import {Pages} from "../../constants/pages";

export const Routing = () => {
    const [navigation, pageChanged] = useUnit([$navigation, $pageChanged])
    const navigate = useNavigate();
    useEffect(() => {
        if (navigation.page !== Pages.HOME) {
            Telegram?.WebApp?.BackButton?.show();
            Telegram.WebApp.BackButton.onClick(() => {
                pageChanged({
                    page: Pages.HOME
                });
            })
        } else {
            Telegram?.WebApp?.BackButton?.hide();
        }
    }, [navigation]);
    useEffect(() => {
        navigate(navigation.page)
    }, [navigation])
    return <></>
}