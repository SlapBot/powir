import React, {useEffect, useState} from 'react';
import './App.css';
import { defaults, Line, Bar }  from 'react-chartjs-2';

defaults.global.defaultFontFamily = 'Neucha'


function App() {
    function randomScalingFactor() {
        return Math.random() * 100
    }

    const [systemInfo, setSystemInfo] = useState({
        "name": "sysInfo",
        "keys": [
            "COMPUTER NAME",
            "SYSTEM PRODUCT NAME",
            "BIOS",
            "OS BUILD",
            "PLATFORM ROLE",
            "CONNECTED STANDBY",
            "REPORT TIME"
        ],
        "data": [
            "SLAPBOT",
            "ASUSTeK COMPUTER INC. GL553VD",
            "GL553VD.308 04/29/2019",
            "18362.1.amd64fre.19h1_release.190318-1202",
            "Mobile",
            "Not supported",
            "2020-05-23 13:58:55"
        ]
    })

    const [batteryInfo, setBatteryInfo] = useState({
        "name": "batteryInfo",
        "keys": [
            "NAME",
            "MANUFACTURER",
            "SERIAL NUMBER",
            "CHEMISTRY",
            "DESIGN CAPACITY",
            "FULL CHARGE CAPACITY",
            "CYCLE COUNT"
        ],
        "data": [
            "SDI ICR18650",
            "Simplo",
            "123456789",
            "LION",
            "48,240 mWh",
            "33,408 mWh",
            "33"
        ]
    })

    const [data, setData] = useState(
        {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'red',
                borderColor: 'red',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                label: 'My Second dataset',
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
            }]
        }
    )
    return (
        <div>
            <div className="border-bottom">
                <div className="mb-2">
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div className="content-center">
                            <div className="content-center pr-2 border-right">
                                <h4>
                                    Roxy
                                </h4>
                                <span className="badge ml-1" style={{
                                    fontSize: "small",
                                    marginTop: "0.3em"
                                }}>v1.0</span>
                            </div>
                            <h5 className="content-center ml-2">Monitoring & Analyzing your battery!</h5>
                        </div>
                        <div className="content-center">
                            <div className="content-center mr-1">
                                <i className="devicon-github-plain colored text-3xl"> </i>
                            </div>
                            <div className="content-center">
                                <i className="devicon-twitter-plain text-3xl"> </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-full md:w-2/12 lg:w-2/12 xl:w-1/12 hidden md:block border-right mt-2 ml-2 mr-2">
                    <div className="fixed">
                        <ul>
                            {/* TODO: create a utility css to add border on current page by extending scss */}
                            <li className="mt-6 mb-3"><span className="border border-primary p-1">Home</span></li>
                            <li className="mb-1">Documentation</li>
                            <li className="mb-1">Help</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-10/12 lg:w-10/12 xl:w-11/12">
                    <div className="border-bottom">
                        <div className="flex flex-wrap border-bottom mt-3 pb-3">
                            <div className="w-full sm:w-full md:w-1/2">
                                <h3>Battery Information</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {batteryInfo.keys.map((keyInfo, index) => {
                                        return <tr>
                                            <td>{keyInfo}</td>
                                            <td>{batteryInfo.data[index]}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full sm:w-full md:w-1/2">
                                <div className="border border-primary">
                                    <div className="content-center">
                                        <h3>Battery Capacity History</h3>
                                    </div>
                                    <Line data={data}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-3 pb-3">
                            <div className="w-full sm:w-full md:w-1/2">
                                <h3>System Information</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {systemInfo.keys.map((keyInfo, index) => {
                                        return <tr>
                                            <td>{keyInfo}</td>
                                            <td>{systemInfo.data[index]}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full sm:w-full md:w-1/2">
                                <div className="border border-primary">
                                    <div className="content-center">
                                        <h3>Battery Capacity History</h3>
                                    </div>
                                    <Line data={data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-center">
                        <h3>Made With</h3>
                        <img src="https://img.icons8.com/cotton/64/000000/like--v1.png" alt="heart" style={{
                            border: "none"
                        }}/>
                        <h3>By <a href="https://slapbot.me">Slapbot</a></h3>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
