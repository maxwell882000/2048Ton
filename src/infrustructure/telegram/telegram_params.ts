export function getTelegramParams(): any {
    const params = Telegram.WebApp.initDataUnsafe.start_param ?? "";
    console.log("getTelegramParams", params)
    return params.split(",")
        .map((e) => {
            return e.split("=");
        })
        .filter(e => e.length == 2)
        .reduce((object, arr) => ({...object, [arr[0]]: arr[1]}), {})
}