
export function getCookiesLookup() {
    if (typeof document !== "object") {
        return {};
    }

    return document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
    }, {});

}

export const getCurrentCookieValue = name => {
    const cookies = getCookiesLookup();
    return cookies[name] ?? "";
}
