import React, {useEffect, useState} from "react";
import openExternalLink from './utils/openExternalLink'
const { ipcRenderer } = window.require('electron')


function Broadcast() {
    const broadcastUrl = 'https://gist.github.com/SlapBot/4b093f88d97522e22205ae9c9d0dea02/raw/update.json'

    const [broadcastData, setBroadcastData] = useState({
        "personal": {
            "status": false,
            "text": ""
        },
        "update": {
            "status": false,
            "text": ""
        },
    })
    const [shouldRenderPersonal, setShouldRenderPersonal] = useState(false)
    const [shouldRenderUpdate, setShouldRenderUpdate] = useState(false)

    useEffect(() => {
        ipcRenderer.send('get-updates', {url: broadcastUrl})
    }, [])

    useEffect(() => {
        ipcRenderer.on('receive-updates', (event, data) => {
            setBroadcastData(data)
            if (data.personal.status) {
                setShouldRenderPersonal(true)
            }
            if (data.update.status) {
                setShouldRenderUpdate(true)
            }
        })
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