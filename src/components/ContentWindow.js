import React from "react";
import {
    systemInfoData,
    batteryInfoData,
    batteryCapacityHistoryData,
    batteryLifeHistoryData,
    batteryLifeOverallHistoryData
} from '../data'
import KeyValueInformationTable from "./sub-components/KeyValueInformationTable";
import Chart from "./sub-components/Chart";
import CurrentBatteryEstimate from "./sub-components/CurrentBatteryEstimate";

function ContentWindow() {
    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full md:w-full lg:w-1/2">
                    <KeyValueInformationTable
                        info={batteryInfoData}
                        heading={"Battery Information"}
                    />
                </div>
                <div className="w-full md:w-full lg:w-1/2">
                    <Chart
                        info={batteryCapacityHistoryData}
                        heading={"Battery Capacity History"}
                        xLabel={"Date"}
                        yLabel={"Battery Capacity ( Mwh )"}
                    />
                </div>
            </div>
            <div className="flex flex-wrap mt-3 pb-3">
                <div className="w-full md:w-full lg:w-1/2">
                    <KeyValueInformationTable
                        info={systemInfoData}
                        heading={"System Information"}
                    />
                </div>
                <div className="w-full md:w-full lg:w-1/2">
                    <div className="flex flex-wrap">
                        <div className="w-full mb-3">
                            <CurrentBatteryEstimate info={batteryLifeOverallHistoryData}/>
                        </div>
                        <div className="w-full">
                            <Chart
                                info={batteryLifeHistoryData}
                                heading={"Battery Life Estimates"}
                                xLabel={"Date"}
                                yLabel={"Battery Life ( minutes )"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentWindow