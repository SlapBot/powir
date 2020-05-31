import React from "react";
import InformationWindow from "./InformationWIndow";
import AboutWindow from "./AboutWindow";
import ActionsWindow from "./ActionsWindow";
import LinksWindow from "./LinksWindow";


function ContentWindow(props) {
    function getToggleStatus(index) {
        return index === props.index ? "" : "hidden"
    }
    return (
        <div>
            <div className={getToggleStatus(0)}>
                <InformationWindow />
            </div>
            <div className={getToggleStatus(1)}>
                <AboutWindow />
            </div>
            <div className={getToggleStatus(2)}>
                <ActionsWindow toggleInformationWindow={props.setInformationWindow}/>
            </div>
            <div className={getToggleStatus(3)}>
                <LinksWindow />
            </div>
        </div>
    )
}

export default ContentWindow