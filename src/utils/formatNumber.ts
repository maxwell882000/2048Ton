import numeral from "numeral";

export function formatNumber(value: number | string, format = "0.[000]a") {
    if (!value || value === 0)
        return ""
    if (Number(value) <= 8192) {
        return value;
    }
    return numeral(value).format(format).toUpperCase()
}