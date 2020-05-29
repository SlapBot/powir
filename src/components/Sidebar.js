import React from "react";

function Sidebar() {
    return (
        <div className="fixed">
            <ul>
                {/* TODO: create a utility css to add border on current page by extending scss */}
                <div className="mt-6 mb-1">
                    <li className="mb-3"><span className="border border-primary p-1">Information</span></li>
                </div>
                <div className="mb-1">
                    <li>
                        <span>About</span>
                    </li>
                </div>
                <div className="mb-1">
                    <li>
                        <span>Links</span>
                    </li>
                </div>
                <div className="mb-1">
                    <li>
                        <span>Help</span>
                    </li>
                </div>
                <div className="mb-1">
                    <li>
                        <span>Credits</span>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Sidebar