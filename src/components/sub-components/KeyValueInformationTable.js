import React from "react";

function KeyValueInformationTable(props) {
    function renderInfo(element, index, type) {
        const extraHelp = [
            {
                'popoverHelp': "Amount of charge battery was designed to hold.",
                'spanClass': 'badge bg-blue text-lg'
            },{
                'popoverHelp': "Amount of charge battery can currently hold.",
                'spanClass': 'badge bg-red text-lg'
            },
        ]
        switch (type) {
            case "batteryInfo":
                switch (index) {
                    case 4:
                    case 5:
                        return <div className="flex">
                            <div>
                                <span className={index === 4 ? extraHelp[0].spanClass : extraHelp[1].spanClass}>
                                    {element}
                                </span>
                            </div>
                            <div className="content-center ml-1">
                                <div className='m-0-important'
                                     popover-right={index === 4 ? extraHelp[0].popoverHelp : extraHelp[1].popoverHelp}
                                >
                                    <img className="no-border"
                                         src="assets/images/ios-help.png"
                                         alt="help"
                                    />
                                </div>
                            </div>
                        </div>
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
            <div className='flex'>
                <img className='no-border mr-1' src={props.iconUrl} alt={props.iconAlt}/>
                <h3>{props.heading}</h3>
            </div>
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
