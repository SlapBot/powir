import {Line} from "react-chartjs-2";
import React from "react";
import { createData } from "./ChartData";

function Chart(props) {
    function getChart(info, type, xLabel, yLabel) {
        let data = createData(info, type)
        let options = {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: xLabel
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    }
                }]
            }
        }
        switch (type) {
            case 'batteryCapacityHistory':
            case 'batteryLifeHistory':
                return <Line data={data} options={options}/>
            default:
                return <Line data={data} options={options}/>
        }
    }

    return (
        <div className="border border-primary">
            <div className="content-center">
                <div>
                    <h3>{props.heading}</h3>
                    <span className="text-xs content-center">{props.info.note}</span>
                </div>
            </div>
            {getChart(props.info, props.info.name, props.xLabel, props.yLabel)}
        </div>
    )
}

export default Chart
