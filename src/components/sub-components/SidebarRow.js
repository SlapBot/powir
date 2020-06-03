import React from "react";

function SidebarRow(props) {
    function notifySidebar() {
        props.notifyBody(props.value.index)
    }

    return (
        <div className={props.value.rootClass}>
            <div className='mb-1'>
                <li className={props.value.liClass}>
                    <span className={props.value.spanClass} onClick={notifySidebar}>
                        <button className='clean-button'>{props.value.name}</button>
                    </span>
                </li>
            </div>
        </div>
    )
}

export default SidebarRow