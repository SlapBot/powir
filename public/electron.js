const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev  = require('electron-is-dev')
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

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  // and load the index.html of the app.
  win.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('battery-report-ready', (event, data) => {
  console.log("received battery-report-ready signal")
  batteryReport.then(data => {
    // scraper.writeDataToFile(JSON.stringify(data, null, 4), 'output.json')
    console.log("sending battery-report signal")
    event.reply('battery-report', data)
  })
})
