const { ipcRenderer } = window.require('electron')

export function openElectronLink(url) {
    ipcRenderer.send('open-link', {url: url})
}

// Remove async?
export function getElectronEvent(channel, callbackFunction) {
    ipcRenderer.on(channel, async (event, data) => {
        callbackFunction(data)
    })
}

export function sendElectronEvent(channel, data) {
    ipcRenderer.send(channel, data);
}
