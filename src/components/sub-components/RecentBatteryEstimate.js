import React from "react";


function RecentBatteryEstimate(props) {
    function renderValue(value) {
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
        console.log(estimateLife)
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
        minimum: 99999999,
        maximum: 0,
        sum: 0,
        count: 0
    })

    console.log(props.info.data)
    return (
        <div className="pb-4 border-bottom">
            <div className="pb-2">
                <h4>Recent Battery Estimate</h4>
                <span className="text-xs">
                    {props.info.note}
                </span>
            </div>
            <div className="flex">
                <div className="mr-1 flex">
                    <h5 className="mr-1">Minimum: </h5>
                    <span className="badge bg-red">{renderValue(formattedData.minimum)}</span>
                </div>
                <div className="mr-1 flex">
                    <h5 className="mr-1">Maximum: </h5>
                    <span className="badge bg-blue">{renderValue(formattedData.maximum)}</span>
                </div>
                <div className="flex">
                    <h5 className="mr-1">Average: </h5>
                    <span className="badge success">{renderValue(formattedData.sum/formattedData.count)}</span>
                </div>
            </div>
        </div>
    )
}

export default RecentBatteryEstimate
