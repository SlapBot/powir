import {groupBy, meanBy, sortBy} from 'lodash'

function createData(info, type) {
    switch (type) {
        case 'batteryCapacityHistory':
            return createBatteryCapacityData(info)
        case 'batteryLifeHistory':
            return createBatteryLifeHistoryData(info)
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
            return array
        }
        // noinspection JSValidateTypes
        let values = sortBy(array)

        /* Then find a generous IQR. This is generous because if (values.length / 4)
         * is not an int, then really you should average the two elements on either
         * side to find q1.
         */
        let q1 = values[Math.floor((values.length / 4))];
        // Likewise for q3.
        let q3 = values[Math.ceil((values.length * (3 / 4)))];
        let iqr = q3 - q1;

        // Then find min and max values
        let maxValue = q3 + iqr*1.5;

        // Then filter anything beyond or beneath these values.
        return array.filter(function(x) {
            return (x <= maxValue)
        });
    }

    function filterDataset(value, index) {
        let activeDatasetRowAverage = meanBy(value, index)
        return value.reduce((data, element) => {
            let value = element[index]
            if (data / activeDatasetRowAverage < 5) {
                data += value
            }
            return data
        }, 0) / value.length
    }

    let formattedInfo = groupBy(info.data.map(item => {
        return [
            chooseDate(item[0]),
            Number(item[1].split(":")[0])*60 + Number(item[1].split(":")[1]),
            Number(item[3].split(":")[0])*60 + Number(item[3].split(":")[1]),
        ]
    }), 0)

    let activeDataset = []
    let designDataset = []

    for (let [, value] of Object.entries(formattedInfo)) {
        activeDataset.push(filterDataset(value, 1))
        designDataset.push(filterDataset(value, 2))
    }

    return {
        labels: Object.keys(formattedInfo),
        datasets: [{
            label: info.keys[1],
            backgroundColor: 'red',
            borderColor: 'red',
            data: filterOutliers(activeDataset),
            fill: false,
        }, {
            label: info.keys[3],
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: filterOutliers(designDataset),
            fill: false,
        }]
    }
}

export {
    createData
}
