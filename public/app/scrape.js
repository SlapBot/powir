const { exec } = require('child_process')
const { readFile, writeFile } = require('fs')
const parser = require('./parse')
const JSSoup = require('jssoup').default


function generateBatteryReport(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if (stderr) {
                resolve(stderr)
            }
            if (stdout) {
                resolve(stdout)
            }
            reject(err)
        })
    })
}

function getHtmlFromFile(path) {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (data) {
                resolve(data)
            }
            reject(err)
        })
    })
}

function readDataFromFile(path) {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (data) {
                resolve(JSON.parse(data))
            }
            reject(err)
        })
    })
}

function writeDataToFile(data, path) {
    return new Promise((resolve, reject) => {
        writeFile(path, data, (err) => {
            if (err) {
                reject(err)
            }
            resolve(true)
        });
    })
}


function getSoupInstance(html) {
    return new JSSoup(html);
}

function getTables(soup) {
    // noinspection JSUnresolvedFunction
    return soup.findAll('table')
}

function cleanNewlineText(text) {
    return text.replace(/\r?\n|\r/g, "").replace(/\s+/g, ' ').trim()
}

function getNote(soup, index) {
    switch (index) {
        case 0:
            return "Information about your system"
        case 3:
            // noinspection JSUnresolvedVariable
            return cleanNewlineText(soup[index].previousSibling.previousSibling.text)
        default:
            return cleanNewlineText(soup[index].previousSibling.text)
    }
}

function getKeyValueInfo(data, rInfo) {
    // noinspection JSUnresolvedFunction
    let colElements = rInfo.findAll('td')
    if (colElements.length > 1 && cleanNewlineText(colElements[0].text)) {
        data[0].push(cleanNewlineText(colElements[0].text))
        data[1].push(cleanNewlineText(colElements[1].text))
    }
    return data
}

function getTabulatedKeys(data, rawInfo, index) {
    // noinspection JSUnresolvedFunction
    let colElements = rawInfo[index].findAll("td").map(element => cleanNewlineText(element.text))
    switch (data.name) {
        case 'powerUsageInfo':
        case 'batteryUsageInfo':
            return colElements.splice(0, colElements.length - 1).concat([
                colElements[colElements.length - 1] + " (PERCENTAGE)",
                colElements[colElements.length - 1] + " (VALUE)"
            ])
        case 'powerUsageHistoryInfo':
        case 'batteryLifeHistory':
            // noinspection JSUnresolvedFunction
            let colSubElements = rawInfo[0].findAll("td")
                .map(element => cleanNewlineText(element.text))
                .filter(element => element)
            return colElements
                .filter(colElement => colElement)
                .map((colElement, index) => {
                    if (index > 0 && index < 3) {
                        return colElement + ' (' + colSubElements[0] + ')'
                    }
                    if (index > 2 && index < 5) {
                        return colElement + ' (' + colSubElements[1] + ')'
                    }
                    return colElement
                })
        default:
            return colElements
    }
}

function getTabulatedData(data, rInfo) {
    // noinspection JSUnresolvedFunction
    let colElements = rInfo.findAll("td")
    let result = {}
    if (colElements.length > 2) {
        switch (data.name) {
            case 'powerUsageInfo':
            case 'batteryUsageInfo':
                result = parser.parseUsageInfo(
                    data.data,
                    colElements.filter(colElement => colElement.text),
                    cleanNewlineText
                )
                break
            case 'powerUsageHistoryInfo':
            case 'batteryCapacityHistory':
            case 'batteryLifeHistory':
                result = parser.parseHistoryInfo(
                    data.data,
                    colElements.filter(colElement => colElement.text),
                    cleanNewlineText
                )
                break
            case 'batteryLifeOverallHistory':
                result = colElements
                    .map(colElement => {
                        let resultElement = cleanNewlineText(colElement.text)
                        if (resultElement === "-") {
                            return "0:00:00"
                        }
                        return resultElement
                    }).filter(colElement => colElement)
                break
            default:
                result = colElements
                    .filter(colElement => colElement)
                    .map(colElement => cleanNewlineText(colElement.text))
                break
        }
        data.data.push(result)
    }
    return data
}


function getInfo(soup, infoName, index, filterType) {
    return new Promise((resolve, reject) => {
        // noinspection JSUnresolvedFunction
        let rawInfo = soup[index].findAll('tr')
        let info = {
            'name': infoName,
            'note': "",
            'keys': [],
            'data': []
        };
        switch (filterType) {
            case 'KEY_VALUE':
                [info.keys, info.data] = rawInfo.reduce(getKeyValueInfo, [[], []]);
                info.note = getNote(soup, index)
                break
            case 'TABULATED_SIMPLE':
                info.keys = getTabulatedKeys({name: infoName}, rawInfo, 0)
                info.data = rawInfo.slice(1).reduce(getTabulatedData, {name: infoName, data: []}).data
                info.note = getNote(soup, index)
                break
            case 'TABULATED_COMPLEX':
                info.keys = getTabulatedKeys({name: infoName}, rawInfo, 1)
                info.data = rawInfo.slice(2).reduce(getTabulatedData, {name: infoName, data: []}).data
                info.note = getNote(soup, index)
                break
            case 'TABULATED_OVERALL':
                // hardcoded keys to ensure no dependency over each table scrape to ensure concurrency.
                info.keys = ["PERIOD",  "ACTIVE (AT FULL CHARGE)",  "CONNECTED STANDBY (AT FULL CHARGE)",
                    "ACTIVE (AT DESIGN CAPACITY)",  "CONNECTED STANDBY (AT DESIGN CAPACITY)"
                ]
                info.data = rawInfo.reduce(getTabulatedData, {name: infoName, data: []}).data
                info.note = getNote(soup, index)
                break
            default:
                reject(info)
        }
        resolve(info)
    })
}


async function scrape(html) {
    let soup = getSoupInstance(html)
    let tables = getTables(soup)
    let values = [
        {tables: tables, name: 'sysInfo', index: 0, filterType: 'KEY_VALUE'},
        {tables: tables, name: 'batteryInfo', index: 1, filterType: 'KEY_VALUE'},
        {tables: tables, name: 'powerUsageInfo', index: 2, filterType: 'TABULATED_SIMPLE'},
        {tables: tables, name: 'batteryUsageInfo', index: 3, filterType: 'TABULATED_SIMPLE'},
        {tables: tables, name: 'powerUsageHistoryInfo', index: 4, filterType: 'TABULATED_COMPLEX'},
        {tables: tables, name: 'batteryCapacityHistory', index: 5, filterType: 'TABULATED_SIMPLE'},
        {tables: tables, name: 'batteryLifeHistory', index: 6, filterType: 'TABULATED_COMPLEX'},
        {tables: tables, name: 'batteryLifeOverallHistory', index: 7, filterType: 'TABULATED_OVERALL'},
    ]
    return Promise.all(
        values.map(info => getInfo(info.tables, info.name, info.index, info.filterType))
    )
}

module.exports = {
    generateBatteryReport,
    getHtmlFromFile,
    scrape,
    readDataFromFile,
    writeDataToFile
}
