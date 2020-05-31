const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')
const isDev  = require('electron-is-dev')
const scraper = require("./app/scrape")
// const { template } = require("./app/menu")


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
    show: false
  })

  win.maximize()
  win.show()
  // and load the index.html of the app.
  win.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Open the DevTools.
  win.webContents.openDevTools()
}


// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)


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
    console.log("sending battery-report signal")
    event.reply('battery-report', data)
  })
})

ipcMain.on('show-original-report', (event, data) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadURL(`file://${__dirname}/../battery-report.html`)
})

ipcMain.on('export-JSON-data', (event, data) => {
  let options = {
    title: "Export Data: JSON format",
    defaultPath : __dirname + '/powir-data.json',
    buttonLabel : "Save JSON",
    filters :[
      {name: 'JSON', extensions: ['json']},
      {name: 'All Files', extensions: ['*']}
    ]
  }
  dialog.showSaveDialog(null, options).then(result => {
    batteryReport.then(data => scraper.writeDataToFile(JSON.stringify(data, null, 4), result.filePath))
        .then(_ => console.log('JSON saved!'))
  })
})

ipcMain.on('export-PDF-report', (event, data) => {
  function pdfSettings() {
    return {
      landscape: false,
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      pageSize: 'A4',
      scaleFactor: 100
    };
  }

  let currentWindow = BrowserWindow.getAllWindows().filter(window => window.isVisible())[0]
  let options = {
    title: "Export Report: PDF format",
    defaultPath : __dirname + '/powir-report.pdf',
    buttonLabel : "Save PDF",
    filters :[
      {name: 'PDF', extensions: ['pdf']},
      {name: 'All Files', extensions: ['*']}
    ]
  }
  currentWindow.webContents.printToPDF(pdfSettings()).then(data => {
    dialog.showSaveDialog(null, options).then(result => {
      scraper.writeDataToFile(data, result.filePath).then(_ => console.log('PDF saved!'))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
})
