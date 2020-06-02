import React from "react";
import openExternalLink from "./openExternalLink";

function Footer() {
    return (
        <div className="custom-border border-top">
            <div className='mt-2 flex' style={{
                justifyContent: "space-between"
            }}>
                <div>
                    <div className="flex">
                        <img className='no-border mr-2' src="https://img.icons8.com/cotton/24/000000/copyright.png" alt="heart"/>
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
