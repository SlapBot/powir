import React, { useState, useEffect } from "react";
import KeyValueInformationTable from "./sub-components/KeyValueInformationTable";
import Chart from "./sub-components/Chart";
import CurrentBatteryEstimate from "./sub-components/CurrentBatteryEstimate";
const { ipcRenderer } = window.require('electron')

function ContentWindow() {
    function shouldRenderComponent(component) {
        return dataFetchStatus ? component : "Loading..."
    }

    const [dataFetchStatus, setDataFetchStatus] = useState(false)
    const [systemInfo, setSystemInfo] = useState({})
    const [batteryInfo, setBatteryInfo] = useState({})
    const [batteryCapacityHistory, setBatteryCapacityHistory] = useState({})
    const [batteryLifeHistory, setBatteryLifeHistory] = useState({})
    const [batteryLifeOverallHistory, setBatteryLifeOverallHistory] = useState({})

    useEffect(() => {
        console.log('sending battery-report-ready signal')
        ipcRenderer.send("battery-report-ready", {status: true})
    }, [])

    useEffect(() => {
        console.log('sending battery-report signal')
        ipcRenderer.on('battery-report', (event, data) => {
            setSystemInfo(data[0])
            setBatteryInfo(data[1])
            setBatteryCapacityHistory(data[5])
            setBatteryLifeHistory(data[6])
            setBatteryLifeOverallHistory(data[7])
            setDataFetchStatus(true)
        })
    }, [])

    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full md:w-full lg:w-1/2">
                    { shouldRenderComponent(
                        <KeyValueInformationTable
                            info={batteryInfo}
                            heading={"Battery Information"}
                        />
                    )}
                </div>
                <div className="w-full md:w-full lg:w-1/2">
                    { shouldRenderComponent(
                        <Chart
                            info={batteryCapacityHistory}
                            heading={"Battery Capacity History"}
                            xLabel={"Date"}
                            yLabel={"Battery Capacity ( Mwh )"}
                        />
                    ) }
                </div>
            </div>
            <div className="flex flex-wrap mt-3 pb-3">
                <div className="w-full md:w-full lg:w-1/2">
                    { shouldRenderComponent(
                        <KeyValueInformationTable
                            info={systemInfo}
                            heading={"System Information"}
                        />
                    )}
                </div>
                <div className="w-full md:w-full lg:w-1/2">
                    <div className="flex flex-wrap">
                        <div className="w-full mb-3">
                            { shouldRenderComponent(
                                <CurrentBatteryEstimate info={batteryLifeOverallHistory}/>
                            )}
                        </div>
                        <div className="w-full">
                            { shouldRenderComponent(
                                <Chart
                                    info={batteryLifeHistory}
                                    heading={"Battery Life Estimates"}
                                    xLabel={"Date"}
                                    yLabel={"Battery Life ( minutes )"}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentWindow