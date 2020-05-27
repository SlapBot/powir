import React from "react";

function KeyValueInformationTable(props) {
    function renderInfo(element, index, type) {
        switch (type) {
            case "batteryInfo":
                switch (index) {
                    case 4:
                        return <div className="flex">
                            <div>
                                <span className="badge bg-blue text-lg">{element}</span>
                            </div>
                            <div className="content-center ml-1">
                                <div popover-top="Popover on top" style={{
                                    margin: "0"
                                }}>
                                    <img className="no-border"
                                         src="https://img.icons8.com/ios/24/000000/help.png"
                                         alt="help"
                                    />
                                </div>
                            </div>
                        </div>
                    case 5:
                        return <span className="badge bg-red text-lg">{element}</span>
                    default:
                        return <p>{element}</p>
                }
            case "systemInfo":
                switch (index) {
                    case 6:
                        return <span className="badge success text-lg">{element}</span>
                    default:
                        return <p>{element}</p>
                }
            default:
                return <p>{element}</p>
        }
    }

    return (
        <div>
            <h3>{props.heading}</h3>
            <span className="text-xs">{props.info.note}</span>
            <table>
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {props.info.keys.map((keyInfo, index) => {
                    return <tr key={keyInfo}>
                        <td>{keyInfo}</td>
                        <td>{renderInfo(props.info.data[index], index, props.info.name)}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default KeyValueInformationTable
