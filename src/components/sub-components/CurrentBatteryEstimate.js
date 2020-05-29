import React from "react";

function CurrentBatteryEstimate(props) {
    function renderLabel(key) {
        return key.split("(")[1].split(")")[0].toLowerCase().split(" ").map(element => {
            return element[0].toUpperCase() + element.slice(1)
        }).join(" ")
    }
    return (
        <div className="pb-4 border-bottom">
            <div className="pb-2">
                <h4>{props.info.data[0][0]}</h4>
                <span className="text-xs">
                    {props.info.note}
                </span>
            </div>
            <div className="flex">
                <div className="mr-1 flex">
                    <h5 className="mr-1">{renderLabel(props.info.keys[1])}:</h5>
                    <span className="badge bg-red">{props.info.data[0][1]}</span>
                </div>
                <div className="flex">
                    <h5 className="mr-1">{renderLabel(props.info.keys[3])}:</h5>
                    <span className="badge bg-blue">{props.info.data[0][3]}</span>
                </div>
            </div>
        </div>
    )
}

export default CurrentBatteryEstimate
