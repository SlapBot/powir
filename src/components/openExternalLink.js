const { ipcRenderer } = window.require('electron')

export default function openExternalLink(url) {
    ipcRenderer.send('open-link', {url: url})
}

