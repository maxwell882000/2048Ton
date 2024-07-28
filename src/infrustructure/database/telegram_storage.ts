export function setValueCloudStorage<V>(key: string, value: V) {
    return new Promise<void>((resolve, reject) => {
        // try {
        Telegram.WebApp.CloudStorage.setItem(key, value == null ? "" : JSON.stringify(value), (error: Error | null) => {
            if (error == null) {
                resolve();
            } else {
                // resolve()
                reject(`Failed to retrieve boards. Key: ${key} Message: ${error}`);
            }
        })
        // } catch (error) {
        //     // @ts-ignore
        //     resolve(null);
        // }

    });
}

export function getValueCloudStorage<V>(key: string) {
    return new Promise<V>((resolve, reject) => {
        // try {
        Telegram.WebApp.CloudStorage.getItem(key, (errors, result) => {
            {
                console.log(`RESULT IS RECIVIED  ${result} ${errors}`)
                if (errors == null) {
                    resolve(result ? JSON.parse(result) : null);
                } else {
                    console.log(`ERROR  IS RECIVIED  ${result} 2 version `)
                    // resolve(result ? JSON.parse(result) : null);
                    reject(`Failed to retrieve. Key: ${key} Message: ${errors}`);
                }
            }
        })
        // } catch (e) {
        //     // @ts-ignore
        //     resolve(null);
        // }

    });
}