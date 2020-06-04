import config from "./config";

export default function openExternalLink(url) {
    if (config.liteMode) {
        import('./liteMode').then(module => module.openWindowLink(url))
    }
    else {
        import('./mainMode').then(module => module.openElectronLink(url))
    }
}
