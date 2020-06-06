import React, {useEffect, useState} from "react";
import openExternalLink from './utils/openExternalLink'
import config from './utils/config'
import { getUpdates } from './utils/fetcher'

function Broadcast() {
    const [broadcastData, setBroadcastData] = useState({
        "personal": {
            "status": false,
            "text": ""
        },
        "update": {
            "status": false,
            "version": config.version,
            "text": ""
        },
    })
    const [shouldRenderPersonal, setShouldRenderPersonal] = useState(false)
    const [shouldRenderUpdate, setShouldRenderUpdate] = useState(false)

    function setValues(data) {
        setBroadcastData(data)
        if (data.personal.status) {
            setShouldRenderPersonal(true)
        }
        if (data.update.status && data.update.version !== config.version) {
            setShouldRenderUpdate(true)
        }
    }
    useEffect(() => {
        console.log("Current Version Running: " + config.version)
        getUpdates(setValues)
    }, [])

    function closePersonalAlert() {
        setShouldRenderPersonal(false)
    }

    function closeUpdateAlert() {
        setShouldRenderUpdate(false)
    }

    function renderMessage(rawText) {
        if (rawText.split("[").length < 2) {
            return (
                <p className='text-black'>{rawText}</p>
            )
        }
        let first_part = rawText.split("[")[0]
        let last_part = rawText.split("[")[1].split("]")[1]
        let link = rawText.split("[")[1].split("]")[0]

        return (
            <p className='text-black'>
                {first_part}[
                <button className='clean-button' onClick={() => openExternalLink(link)}>
                    {link}
                </button>
                ]{last_part}
            </p>
        )
    }

    function render(broadcast, closeCallback, alertClass) {
        return (
            <div>
                <div className={alertClass}>
                    <div className='flex justify-between'>
                        {renderMessage(broadcast.text)}
                        <img className='cursor-pointer image-24'
                             onClick={closeCallback}
                             src="assets/images/delete-sign.png"
                             alt='delete-sign'
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {
                shouldRenderPersonal
                    ? render(broadcastData.personal, closePersonalAlert, 'alert alert-secondary')
                    : null
            }
            {
                shouldRenderUpdate
                    ? render(broadcastData.update, closeUpdateAlert, 'alert alert-warning')
                    : null
            }
        </div>
    )
}

export default Broadcast