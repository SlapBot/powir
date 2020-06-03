import React from "react";
import openExternalLink from "./utils/openExternalLink";

function Footer() {
    return (
        <div className="custom-border border-top">
            <div className='mt-2 flex justify-between'>
                <div>
                    <div className="flex">
                        <img className='no-border mr-2' src="assets/images/copyright.png" alt="heart"/>
                        <button
                            className="clean-button"
                            onClick={() => openExternalLink("https://slapbot.me")}>
                            Ujjwal Gupta (Slapbot)
                        </button>
                    </div>
                </div>
                <div>
                    <button
                        className='clean-button' onClick={() => openExternalLink("https://icons8.com/")}>
                        Many thanks to Icons8 for all of the lovely icons
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Footer
