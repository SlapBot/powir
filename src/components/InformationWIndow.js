import React, { useState, useEffect } from "react";
import KeyValueInformationTable from "./sub-components/KeyValueInformationTable";
import Chart from "./sub-components/Chart";
import CurrentBatteryEstimate from "./sub-components/CurrentBatteryEstimate";
import RecentBatteryEstimate from "./sub-components/RecentBatteryEstimate";
import { getReport } from './utils/fetcher'

function InformationWindow() {
    function shouldRenderComponent(component) {
        return dataFetchStatus ? component : "Loading..."
    }

    const [dataFetchStatus, setDataFetchStatus] = useState(false)
    const [systemInfo, setSystemInfo] = useState({})
    const [batteryInfo, setBatteryInfo] = useState({})
    const [powerUsageInfo, setPowerUsageInfo] = useState({})
    const [batteryUsageInfoData, setBatteryUsageInfoData] = useState({})
    const [batteryCapacityHistory, setBatteryCapacityHistory] = useState({})
    const [batteryLifeHistory, setBatteryLifeHistory] = useState({})
    const [batteryLifeOverallHistory, setBatteryLifeOverallHistory] = useState({})

    function setValues(data) {
        setSystemInfo(data[0])
        setBatteryInfo(data[1])
        setPowerUsageInfo(data[2])
        setBatteryUsageInfoData(data[3])
        setBatteryCapacityHistory(data[5])
        setBatteryLifeHistory(data[6])
        setBatteryLifeOverallHistory(data[7])
        setDataFetchStatus(true)
    }

    useEffect(() => {
        getReport(setValues)
    }, [])

    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full lg:w-1/2">
                    { shouldRenderComponent(
                        <KeyValueInformationTable
                            info={batteryInfo}
                            heading={"Battery Information"}
                            iconUrl={"assets/images/high-battery.png"}
                            iconAlt={"high-battery"}
                        />
                    )}
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="border border-primary">
                        { shouldRenderComponent(
                            <Chart
                                info={batteryCapacityHistory}
                                heading={"Battery Capacity History"}
                                metaData={{
                                    xLabel: "Date",
                                    yLabel: "Battery Capacity ( Mwh )"
                                }}
                            />
                        ) }
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full lg:w-1/2">
                    { shouldRenderComponent(
                        <KeyValueInformationTable
                            info={systemInfo}
                            heading={"System Information"}
                            iconUrl={"assets/images/windows8.png"}
                        />
                    )}
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-wrap">
                        <div className="w-full mb-3">
                            { shouldRenderComponent(
                                <CurrentBatteryEstimate info={batteryLifeOverallHistory}/>
                            )}
                        </div>
                        <div className="w-full">
                            <div className="border border-primary">
                                { shouldRenderComponent(
                                    <Chart
                                        info={batteryLifeHistory}
                                        heading={"Battery Life Estimates"}
                                        metaData={{
                                            xLabel: "Date",
                                            yLabel: "Battery Life ( minutes )"
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mt-3 pb-3">
                <div className="w-full flex flex-wrap pb-2">
                    <div className="w-full lg:w-1/2">
                        <div className="w-full">
                            <div className="flex">
                                <img className='no-border mr-1' src="assets/images/lightning-arrow.png" alt={'lightning-arrow'}/>
                                <h3>Recent Power & Battery Usage</h3>
                            </div>
                            <span className='text-xs'>Observed power and battery states of the system in the recent time period.</span>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full mt-4 mr-2">
                                { shouldRenderComponent(
                                    <Chart
                                        info={powerUsageInfo}
                                        heading={""}
                                        metaData={{
                                            xLabel: "Date",
                                            yLabel: "Usage ( hours )",
                                            type:'dailyBar'
                                        }}
                                    />
                                )}
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-wrap">
                                    <div className="w-1/2 mt-4">
                                        { shouldRenderComponent(
                                            <Chart
                                                info={powerUsageInfo}
                                                heading={""}
                                                metaData={{
                                                    type:'cumulativePie'
                                                }}
                                            />
                                        )}
                                    </div>
                                    <div className="w-1/2 mt-4">
                                        { shouldRenderComponent(
                                            <Chart
                                                info={powerUsageInfo}
                                                heading={""}
                                                metaData={{
                                                    type:'cumulativeActiveSuspended'
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-wrap">
                            <div className="w-full mb-3">
                                { shouldRenderComponent(
                                    <RecentBatteryEstimate info={batteryUsageInfoData}/>
                                )}
                            </div>

                            <div className="w-full mt-4 border border-primary">
                                { shouldRenderComponent(
                                    <Chart
                                        info={powerUsageInfo}
                                        heading={"Recent Usage"}
                                        metaData={{
                                            xLabel: "Time",
                                            yLabel: "Battery Percentage",
                                            type:'dailyLine'
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformationWindow