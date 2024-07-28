export function createUniqueIdGenerator() {
    let counter = 0;

    return function getUniqueId(prefix: string = "id"): string {
        counter++;
        return `${prefix}-${counter}`;
    };
}
