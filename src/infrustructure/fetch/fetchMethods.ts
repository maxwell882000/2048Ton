const baseUrl = "https://maxwell882.github.io";


export async function fetchMethods<T>(method: string): Promise<T> {
    const data = await fetch(`${baseUrl}/${method}/config.json`);
    return await data.json() as T;
}