import React from "react";
import openExternalLink from "./openExternalLink";

function Navbar() {
    return (
        <div className="custom-border border-bottom">
            <div className="mb-2">
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div className="content-center">
                        <div
                            className="content-center pr-2 custom-border border-right cursor-pointer"
                            onClick={() => openExternalLink('https://powir.slapbot.me')}
                        >
                            <h4>
                                Powir
                            </h4>
                            <span className="badge ml-1" style={{
                                fontSize: "small",
                                marginTop: "0.3em"
                            }}>v1.0</span>
                        </div>
                        <h5 className="content-center ml-2">Monitoring & Analyzing Your Battery!</h5>
                    </div>
                    <div className="content-center">
                        <div className="content-center mr-1">
                            <img className="no-border cursor-pointer"
                                 src="https://img.icons8.com/doodle/48/000000/github--v1.png"
                                 alt="Github"
                                 onClick={() => openExternalLink('https://github.com/slapbot/powir')}
                            />
                        </div>
                        <div className="content-center">
                            <img className="no-border cursor-pointer"
                                 src="https://img.icons8.com/doodle/48/000000/twitter--v1.png"
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