import React from "react";

function Sidebar() {
    return (
        <div className="fixed">
            <ul>
                {/* TODO: create a utility css to add border on current page by extending scss */}
                <li className="mt-6 mb-3"><span className="border border-primary p-1">Home</span></li>
                <li className="mb-1">Documentation</li>
                <li className="mb-1">Help</li>
            </ul>
        </div>
    )
}

export default Sidebar