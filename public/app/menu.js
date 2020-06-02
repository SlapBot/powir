function getMenuTemplate(server) {
    return [
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                {
                    label: 'Main Website',
                    click: async () => {
                        await server.openLink('https://powir.slapbot.me')
                    }
                },{
                    label: 'Author',
                    click: async () => {
                        server.showAuthorPage()
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Actions',
            submenu: [
                {
                    label: 'Export JSON',
                    click: async () => {
                        server.exportJSONData()
                    }
                },
                {
                    label: 'Export PDF',
                    click: async () => {
                        server.exportPDFReport()
                    }
                },
                { type: 'separator' },
                {
                    label: 'Display Original Report',
                    click: async () => {
                        server.showOriginalReport()
                    }
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Tools',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Issues/Bugs',
                    click: async () => {
                        await server.openLink('https://github.com/slapbot/powir/issues')
                    }
                },{
                    label: 'Chat/Updates',
                    click: async () => {
                        await server.openLink('https://twitter.com/ugupta41')
                    }
                },{
                    label: 'Feedback/Enquiry',
                    click: async () => {
                        await server.openLink('https://slapbot.me')
                    }
                }
            ]
        }
    ]
}

module.exports = {
    getMenuTemplate
}
