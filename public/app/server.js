const scraper = require("./app/scrape")

function getBatteryReport() {
    // return scraper.generateBatteryReport('powercfg /batteryreport')
    //     .then(_ => scraper.getHtmlFromFile('battery-report.html'))
    //     .catch(error => console.log(error))
    //     .then(html => scraper.scrape(html))

    return scraper.getHtmlFromFile('battery-report.html')
        .catch(error => console.log(error))
        .then(html => scraper.scrape(html))
}

let batteryReport = getBatteryReport()

function sendBatteryReport(event, data) {
    console.log("received battery-report-ready signal")
    batteryReport.then(data => {
        console.log("sending battery-report signal")
        event.reply('battery-report', data)
    })
}

function showOriginalReport() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadURL(`file://${__dirname}/../battery-report.html`)
}