export function saveValueCloudStorage(key: string, score: number) {
    window.Telegram.WebApp.CloudStorage.setItem(key, score)
}

export function getValueCloudStorage(key: string, resultCallback: ((error: Error) => void) | ((error: null, value: string) => void)) {
    window.Telegram.WebApp.CloudStorage.getItem(key, resultCallback)
}