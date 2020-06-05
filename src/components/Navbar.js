import React from "react";
import openExternalLink from "./utils/openExternalLink";
import config from "./utils/config";

function Navbar() {
    function formatVersion(version) {
        return  version.split(".").splice(0, 2).join(".")
    }
    return (
        <div className="custom-border border-bottom">
            <div className="mb-2">
                <div className='flex justify-between'>
                    <div className="content-center">
                        <div
                            className="content-center pr-2 custom-border border-right cursor-pointer"
                            onClick={() => openExternalLink('https://powir.slapbot.me')}
                        >
                            <h4>
                                Powir
                            </h4>
                            <span className="badge ml-1 mt-0-3 text-sm">v{formatVersion(config.version)}</span>
                        </div>
                        <h5 className="content-center ml-2">Monitoring & Analyzing Your Battery!</h5>
                    </div>
                    <div className="content-center">
                        <div className="content-center mr-1">
                            <img className="no-border cursor-pointer"
                                 src="assets/images/github--v1.png"
                                 alt="Github"
                                 onClick={() => openExternalLink('https://github.com/slapbot/powir')}
                            />
                        </div>
                        <div className="content-center">
                            <img className="no-border cursor-pointer"
                                 src="assets/images/twitter--v1.png"
                                 alt="Twitter"
                                 onClick={() => openExternalLink('https://twitter.com/ugupta41')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar