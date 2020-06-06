import React from "react";


function RecentBatteryEstimate(props) {
    function renderValue(formattedData, type) {
        switch (type) {
            case 'MINIMUM':
                if (formattedData.minimum === Infinity) {
                    return 'NONE'
                }
                return formatTime(formattedData.minimum)
            case 'MAXIMUM':
                if (formattedData.maximum === 0) {
                    return 'NONE'
                }
                return formatTime(formattedData.maximum)
            case 'AVERAGE':
                if (formattedData.maximum === 0 || formattedData.minimum === Infinity) {
                    return 'NONE'
                }
                return formatTime(formattedData.sum/formattedData.count)
            default:
                return 'NONE'
        }
    }

    function formatTime(value) {
        let hours = Math.floor(value / 60)
        let minutes = Math.floor(value % 60)
        let seconds = Math.floor((value - Math.floor(value)) * 100)
        return hours + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + seconds
    }

    let formattedData = props.info.data.reduce((data, item) => {
        let percent = Number(item[3].split("%")[0])
        let durationMinutes = Number(item[2].split(":")[0])*60 + Number(item[2].split(":")[1])
        if (percent === 0 || durationMinutes === 0) {
            return data
        }
        let estimateLife = (durationMinutes * 100) / percent
        if (estimateLife < data.minimum) {
            data.minimum = estimateLife
        }
        if (estimateLife > data.maximum) {
            data.maximum = estimateLife
        }
        data.sum += estimateLife
        data.count += 1
        return data
    }, {
        minimum: Infinity,
        maximum: 0,
        sum: 0,
        count: 0
    })

    return (
        <div className="pb-4 border-bottom">
            <div className="pb-2">
                <h4>Recent Battery Life Estimate</h4>
                <span className="text-xs">
                    {props.info.note}
                </span>
            </div>
            <div className="flex">
                <div className="mr-1 flex">
                    <h5 className="mr-1">Minimum: </h5>
                    <span className="badge bg-red">{renderValue(formattedData, 'MINIMUM')}</span>
                </div>
                <div className="mr-1 flex">
                    <h5 className="mr-1">Maximum: </h5>
                    <span className="badge bg-blue">{renderValue(formattedData, 'MAXIMUM')}</span>
                </div>
                <div className="flex">
                    <h5 className="mr-1">Average: </h5>
                    <span className="badge success">{renderValue(formattedData, 'AVERAGE')}</span>
                </div>
            </div>
        </div>
    )
}

export default RecentBatteryEstimate
