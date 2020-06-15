import {Bar, Line, Pie} from "react-chartjs-2";
import React from "react";
import { createData } from "./ChartData";

function Chart(props) {
    function renderChart(info, type, metaData) {
        try {
            return getChart(info, type, metaData)
        } catch (e) {
            console.log(e)
        }
    }
    function getChart(info, type, metaData) {
        let data = createData(info, type, metaData)
        let options = {
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: metaData.xLabel
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: metaData.yLabel
                    }
                }]
            }
        }
        switch (type) {
            case 'batteryCapacityHistory':
            case 'batteryLifeHistory':
                return <Line data={data} options={options}/>
            case 'powerUsageInfo':
                if (metaData.type === 'cumulativePie') {
                    return <Pie data={data} />
                }
                else if(metaData.type === 'cumulativeActiveSuspended') {
                    return <Pie data={data}/>
                }
                else if (metaData.type === 'dailyBar') {
                    return <Bar data={data} options={options}/>
                }
                else if (metaData.type === 'dailyLine') {
                    return <Line data={data} options={options} />
                }
                return <Pie data={data} />
            default:
                return <Line data={data} options={options}/>
        }
    }

    return (
        <div>
            <div className="content-center">
                <div>
                    <h3>{props.heading}</h3>
                    <span className="text-xs content-center">{props.info.note}</span>
                </div>
            </div>
            {renderChart(props.info, props.info.name, props.metaData)}
        </div>
    )
}

export default Chart
