export function saveValueCloudStorage(key: string, value: string) {
    Telegram.WebApp.CloudStorage.setItem(key, value)
}

export function getValueCloudStorage(key: string, resultCallback: ((error: Error) => void) | ((error: null, value: string) => void)) {
    Telegram.WebApp.CloudStorage.getItem(key, resultCallback)
}