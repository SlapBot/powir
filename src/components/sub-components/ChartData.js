import {groupBy, sortBy} from 'lodash'

function createData(info, type, metaData) {
    switch (type) {
        case 'batteryCapacityHistory':
            return createBatteryCapacityData(info)
        case 'batteryLifeHistory':
            return createBatteryLifeHistoryData(info)
        case 'powerUsageInfo':
            if (metaData.type === 'cumulativePie') {
                return createCumulativePiePowerUsageInfoData(info)
            }
            else if (metaData.type === 'dailyBar') {
                return createBarPowerUsageInfoData(info)
            }
            else if (metaData.type === 'dailyLine') {
                return createLinePowerUsageInfoData(info)
            }
            return createActiveSuspendedPiePowerUsageInfoData(info)
        default:
            return {
                labels: [0, 1],
                datasets: [{
                    label: 'Default',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    data: [0, 100],
                    fill: false,
                }]
            }
    }
}

function createBatteryCapacityData(info) {
    return info.data.reduce((data, item, index) => {
        if (index > 0) {
            if (item[1] === info.data[index-1][1]) {
                return data
            }
        }
        data.labels.push(item[0].split(" - ")[1])
        data.datasets[0].data.push(item[1].split(" ")[0].split(",").join(""))
        data.datasets[1].data.push(item[2].split(" ")[0].split(",").join(""))
        return data
    }, {
        labels: [],
        datasets: [{
            label: info.keys[1],
            backgroundColor: 'red',
            borderColor: 'red',
            data: [],
            fill: false,
        }, {
            label: info.keys[2],
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [],
            fill: false,
        }]
    })
}

function createBatteryLifeHistoryData(info) {
    function getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate()
    }

    function chooseDate(date) {
        let [start_date, end_date] = date.split(" - ")
        if (getDaysInMonth(new Date(start_date)) - new Date(start_date).getDate() > new Date(end_date).getDate()) {
            return start_date.split("-").slice(0, 2).join("")
        }
        return end_date.split("-").slice(0, 2).join("")
    }

    function filterOutliers(array) {
        /*
        * Reference: https://www.mathworks.com/matlabcentral/cody/problems/42485-eliminate-outliers-using-interquartile-range
        * Following this approach except we aren't repeating the IQR and elimination process after every step.
        * */
        // Then sort
        // noinspection JSValidateTypes
        if (array.length < 4) {
            return {
                data: array,
                indexes: []
            }
        }
        // noinspection JSValidateTypes
        let values = sortBy(array)

        /* Then find a generous IQR. This is generous because if (values.length / 4)
         * is not an int, then really you should average the two elements on either
         * side to find q1.
         */
        let q1 = values[Math.floor((values.length / 4))]
        // Likewise for q3.
        let q3 = values[Math.ceil((values.length * (3 / 4)))]
        let iqr = q3 - q1;

        // Then find min and max values
        let maxValue = q3 + iqr*1.5;

        // Then reduce anything beyond or beneath these values.
        return array.reduce((data, item, index) => {
            if (item <= maxValue) {
                data.indexes.push(index)
                data.data.push(item)
                return data
            }
            return data
        }, {
            data: [],
            indexes: []
        })
    }

    function averageDatasetByMonth(value, index) {
        return value.reduce((data, element) => {
            data += element[index]
            return data
        }, 0) / value.length
    }

    let formattedInfo = groupBy(info.data.reduce((data, item) => {
        if (item[1] === "0:00:00" || item[3] === "0:00:00") {
            return data
        }
        data.push([
            chooseDate(item[0]),
            Number(item[1].split(":")[0])*60 + Number(item[1].split(":")[1]),
            Number(item[3].split(":")[0])*60 + Number(item[3].split(":")[1]),
        ])
        return data
    }, []), 0)

    let activeDataset = []
    let designDataset = []

    for (let [, value] of Object.entries(formattedInfo)) {
        activeDataset.push(averageDatasetByMonth(value, 1))
        designDataset.push(averageDatasetByMonth(value, 2))
    }
    let filteredDataset = filterOutliers(activeDataset)
    let filteredActiveDataset = filterOutliers(activeDataset).data
    let filteredDesignDataset = designDataset.filter((item, index) => filteredDataset.indexes.includes(index))
    let labelsDataset = Object.keys(formattedInfo).reduce((data, item, index) => {
        if (filteredDataset.indexes.includes(index)) {
            data.push(item.slice(0, 4) + "/" + item.slice(4, 6))
            return data
        }
        return data
    }, [])

    return {
        labels: labelsDataset,
        datasets: [{
            label: info.keys[1],
            backgroundColor: 'red',
            borderColor: 'red',
            data: filteredActiveDataset,
            fill: false,
        }, {
            label: info.keys[3],
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: filteredDesignDataset,
            fill: false,
        }]
    }
}

function getGroupedPowerUsageInfoData(info) {
    let formattedData = info.data.reduce((data, item, index) => {
        function getDuration(pastItem, currentItem, futureItem) {
            function getDateObject(dateString) {
                return new Date(dateString)
            }
            function getMidnightDateTime(date) {
                return new Date(date.toUTCString()).setHours(0, 0, 0, 0)
            }
            function getReturnItem(item, duration) {
                return [
                    item[0].split(" ")[0],
                    item[0].split(" ")[1],
                    duration / 1000 / 60,
                    item[1],
                    item[2]
                ]
            }
            let past = getDateObject(pastItem[0])
            let current = getDateObject(currentItem[0])
            let future = getDateObject(futureItem[0])
            if (past.getDate() === current.getDate()) {
                if (future.getDate() === current.getDate()) {
                    return [getReturnItem(currentItem, (future - current))]
                }
                return [getReturnItem(currentItem, (getMidnightDateTime(future) - current))]
            }
            else {
                if (future.getDate() === current.getDate()) {
                    return [[
                        currentItem[0].split(" ")[0],
                        "0:00:00",
                        (current - getMidnightDateTime(current)) / 1000 / 60,
                        'suspended',
                        null
                    ],
                        getReturnItem(currentItem, (future - current))
                    ]
                }
                return [[
                    currentItem[0].split(" ")[0],
                    "0:00:00",
                    (current - getMidnightDateTime(current)) / 1000 / 60,
                    'suspended',
                    null
                ],
                    getReturnItem(currentItem, (getMidnightDateTime(future) - current))
                ]
            }
        }
        switch (index) {
            case info.data.length-1:
                return data
            case 0:
                return data
            default:
                let durations = getDuration(
                    info.data[index-1],
                    item,
                    info.data[index+1]
                )
                durations.map(duration => data.push(duration))
                return data
        }
    }, [])
    return groupBy(formattedData, 0)
}

function getDailySumGroupedPowerUsageInfoData(groupData, filterConditional, segregationConditional) {
    let powerUsageDataset = []
    for (let [, value] of Object.entries(groupData)) {
        powerUsageDataset.push(value.reduce((data, item) => {
            if (filterConditional(item)) {
                return data
            }
            if (segregationConditional(item)) {
                data[0] += item[2]
            }
            else {
                data[1] += item[2]
            }
            return data
        }, [0, 0]))
    }
    return powerUsageDataset
}

function formatPowerUsageInfoTime(minutes) {
    if (minutes > 59) {
        return Math.floor(minutes / 60) + ' Hr ' + Math.floor(minutes % 60) + ' Minutes'
    }
    return Math.floor(minutes) + ' Minutes'
}

function createCumulativePiePowerUsageInfoData(info) {
    let groupData = getGroupedPowerUsageInfoData(info)
    let powerUsageDataset = getDailySumGroupedPowerUsageInfoData(
        groupData,
        (item) => item[3].toLowerCase() === 'suspended',
        (item) => item[4].toUpperCase() === 'AC'
    )
    let cumulativePowerUsageDataset = powerUsageDataset.reduce((data, item) => {
        data[0] += Math.floor(item[0])
        data[1] += Math.floor(item[1])
        return data
    }, [0, 0])

    return {
        labels: [
            'AC: ' + formatPowerUsageInfoTime(cumulativePowerUsageDataset[0]),
            'Battery: ' + formatPowerUsageInfoTime(cumulativePowerUsageDataset[1])
        ],
        datasets: [{
            labelString: 'AC vs Battery',
            backgroundColor: ['green', 'orange'],
            data: cumulativePowerUsageDataset,
            fill: false,
        }]
    }
}

function createBarPowerUsageInfoData(info) {
    let groupData = getGroupedPowerUsageInfoData(info)
    let powerUsageDataset = getDailySumGroupedPowerUsageInfoData(
        groupData,
        (item) => item[3].toLowerCase() === 'suspended',
        (item) => item[4].toUpperCase() === 'AC'
    )
    let powerUsageActiveSuspendedDataset = getDailySumGroupedPowerUsageInfoData(
        groupData,
        (_) => false,
        (item) => item[3].toLowerCase() === 'active'
    )

    return {
        labels: Object.keys(groupData),
        datasets: [{
            label: 'AC',
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
            data: powerUsageDataset.map(item => Math.round((item[0] / 60) * 10) / 10),
        },{
            label: 'Battery',
            backgroundColor: 'orange',
            borderColor: 'orange',
            borderWidth: 1,
            data: powerUsageDataset.map(item => Math.round((item[1] / 60) * 10) / 10),
        },{
            label: 'ON',
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
            data: powerUsageActiveSuspendedDataset.map(item => Math.round((item[0] / 60) * 10) / 10),
        },{
            label: 'OFF',
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            data: powerUsageActiveSuspendedDataset.map(item => Math.round((item[1] / 60) * 10) / 10),
        }]
    }
}

function createActiveSuspendedPiePowerUsageInfoData(info) {
    let groupData = getGroupedPowerUsageInfoData(info)
    let powerUsageActiveSuspendedDataset = getDailySumGroupedPowerUsageInfoData(
        groupData,
        (_) => false,
        (item) => item[3].toLowerCase() === 'active'
    )
    let cumulativePowerUsageActiveSuspendedDataset = powerUsageActiveSuspendedDataset.reduce((data, item) => {
        data[0] += Math.floor(item[0])
        data[1] += Math.floor(item[1])
        return data
    }, [0, 0])

    return {
        labels: [
            'ON ' + formatPowerUsageInfoTime(cumulativePowerUsageActiveSuspendedDataset[0]),
            'OFF ' + formatPowerUsageInfoTime(cumulativePowerUsageActiveSuspendedDataset[1])
        ],
        datasets: [{
            label: 'AC vs Battery',
            backgroundColor: ['blue', 'red'],
            data: cumulativePowerUsageActiveSuspendedDataset,
            fill: false,
        }]
    }
}

function createLinePowerUsageInfoData(info) {
    let percentageDataset = info.data.reduce((data, item, index) => {
        let dateString = (date) => date.getMonth()+1 + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
        if (index > 1) {
            let currentPercentage = item[item.length-2]
            let lastPercentage = info.data[index-1][info.data[index-1].length-2]
            if (currentPercentage === lastPercentage) {
                return data
            }
        }
        data.push({
            x: dateString(new Date(item[0])),
            y: item[item.length-2].split(" ")[0]
        })
        return data
    }, [])
    return {
        labels: percentageDataset.map(item => item.x),
        datasets: [{
            label: 'Battery Percentage',
            backgroundColor: 'red',
            borderColor: 'red',
            data: percentageDataset,
            fill: false
        }]
    }
}
export {
    createData
}
