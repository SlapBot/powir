const { ipcMain } = require('electron')

const template = [
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Export JSON',
                click: async (channel, listener) => {
                    ipcMain.once('export-JSON-data', listener)
                }
            },
            {
                label: 'Export PDF',
                click: async (channel, listener) => {
                    ipcMain.once('export-pdf-report', listener)
                }
            },
            { type: 'separator' },
            {
                label: 'Display Original Report',
                click: async (channel, listener) => {
                    ipcMain.once('show-original-report', listener)
                }
            },
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
]

module.exports = {
    template
}
