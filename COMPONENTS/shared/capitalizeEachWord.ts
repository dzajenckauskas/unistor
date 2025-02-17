export const capitalizeEachWord = (string: string) => {
    if (!string) return undefined
    return string.replace(/\b\w/g, (char: string) => char.toUpperCase());
};