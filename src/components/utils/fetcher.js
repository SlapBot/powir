import config from "./config";

export function getReport(callbackFunction) {
    if (config.liteMode) {
        return import('./liteMode').then(module => module.getResource('output.json', callbackFunction))
    }
    return import('./mainMode').then(module => {
        module.sendElectronEvent('battery-report-ready', {status: true})
        module.getElectronEvent('battery-report', callbackFunction)
    })
}

export function getUpdates(callbackFunction) {
    const broadcastUrl = config.liteMode ? 'update.json' : 'https://gist.github.com/SlapBot/4b093f88d97522e22205ae9c9d0dea02/raw/'
    if (config.liteMode) {
        return import('./liteMode').then(module => module.getResource(broadcastUrl, callbackFunction))
    }
    return import('./mainMode').then(module => {
        module.sendElectronEvent('get-updates', {url: broadcastUrl})
        module.getElectronEvent('receive-updates', callbackFunction)
    })
}

export function sendEvent(channel, data) {
    if (config.liteMode) {
        return
    }
    return import('./mainMode').then(module => module.sendElectronEvent(channel, data))
}
