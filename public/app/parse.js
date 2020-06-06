function parseUsageInfo(data, colElements, cleanerFn) {
    return colElements.map((colElement, colIndex) => {
        let formattedElement = cleanerFn(colElement.text)
        switch (colIndex) {
            // Start-time: date time/time
            case 0:
                if (formattedElement.split(" ").length === 1) {
                    return data[data.length-1][colIndex].split(" ")[0] + " " + formattedElement
                }
                break
            case 2:
                // Source: AC/Battery
                if (formattedElement === "") {
                    return data[data.length-1][colIndex] + formattedElement
                }
                break
            case 3:
                // Energy Drained: Percentage / -
                if (formattedElement === '-') {
                    return "0 %"
                }
                break
            case 4:
                // Energy Drained: mWh / -
                if (formattedElement === '-') {
                    return "0 mWh"
                }
                break
            default:
                break
        }
        return formattedElement
    })
}

function parseHistoryInfo(data, colElements, cleanerFn) {
    function addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }

    return colElements.map((colElement, colIndex) => {
        let formattedElement = cleanerFn(colElement.text)
        switch (colIndex) {
            // Period: date / date - date
            case 0:
                if (formattedElement.split(" - ").length === 1) {
                    return formattedElement + " - " + addDays(new Date(formattedElement), 1)
                        .toISOString().split("T")[0]
                }
                if (data.length > 0) {
                    let lastDate = new Date(data[data.length - 1][colIndex].split(" - ")[1])
                    let currentDate = new Date(formattedElement.split(" - ")[0])
                    if (lastDate > currentDate) {
                        return addDays(currentDate, 1).toISOString().split("T")[0]
                            + " - " +
                            formattedElement.split(" - ")[1]
                    }
                }
                break
            default:
                if (formattedElement === "-") {
                    return "0:00:00"
                }
                break
        }
        return formattedElement
    })
}

module.exports = {
    parseUsageInfo,
    parseHistoryInfo
}