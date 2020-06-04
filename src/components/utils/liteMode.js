export function openWindowLink(url) {
    window.open(url, "_blank")
}

export function getResource(url, callbackFunction) {
    return fetch(url).then(response => response.json()).then(data => callbackFunction(data))
}
