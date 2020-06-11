import React from "react";
import openExternalLink from "./utils/openExternalLink";

function AboutWindow() {
    let features = [
        {
            'id': 0,
            'text': 'Provides you with a simple and clean UI to list your battery and system information.',
            'icon': 'assets/images/picture.png'
        },{
            'id': 1,
            'text': 'Shows you the change in battery capacity since the OS was installed.',
            'icon': 'assets/images/high-battery.png'
        },{
            'id': 2,
            'text': 'Analyzes the current and overall estimated battery life of your system.',
            'icon': 'assets/images/hourglass--v1.png'
        },{
            'id': 3,
            'text': 'Computes various statistics to give a better understanding of your power usage.',
            'icon': 'assets/images/statistics--v1.png'
        },{
            'id': 4,
            'text': 'Ability to export all of the data via various formats: PDF (app), JSON (processed), HTML (original report).',
            'icon': 'assets/images/rescan-document.png'
        },{
            'id': 5,
            'text': '100% free and completely open-source for absolute transparency.',
            'icon': 'assets/images/console--v2.png'
        },{
            'id': 6,
            'text': 'Completely portable app with no installation required, ready to use out of the box.',
            'icon': 'assets/images/audio-cable.png'
        }
    ]
    let reasons = [
        {
            'id': 0,
            'text': 'Complete lack of any such power/battery monitoring analyzing tool available in the market.',
            'icon': 'assets/images/error.png'
        },{
            'id': 1,
            'text': 'Obscure documentation over how to find battery statuses on the Internet.',
            'icon': 'assets/images/delete-sign.png'
        },{
            'id': 2,
            'text': 'Required to use terminal in order to run a command showing information about the system.',
            'icon': 'assets/images/iphone-spinner.png'
        },{
            'id': 3,
            'text': 'Devoid of any simple and understandable metrics from the underlying API or report.',
            'icon': 'assets/images/api.png'
        },
    ]
    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full">
                    <div className="flex flex-wrap pb-2 border-bottom">
                        <div className="w-full lg:w-1/2">
                            <div>
                                <div className="flex">
                                    <img className="no-border mr-2" src="assets/images/windows-client.png" alt='windows-client'/>
                                    <h3>What is Powir?</h3>
                                </div>
                                <div className="p-3">
                                    <p>Powir is a Windows 10 based tool to monitor and analyze your system's power and battery usage.</p>
                                    <p className='mt-1'>It provides you with various information and statistics about the current and
                                        overall history of the power and battery usage of your system.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div>
                                <div className="flex">
                                    <img className="no-border mr-2" src="assets/images/so-so.png" alt='so-so'/>
                                    <h3>Who built it?</h3>
                                </div>
                                <div className="p-3">
                                    <p>Hey there! I'm
                                        <button
                                            className='clean-button ml-1 underline mb-0'
                                            onClick={() => openExternalLink('https://slapbot.me/')}>
                                            Ujjwal</button> who goes around with the name Slapbot in open source communities,
                                        You'd often find me blabbering my completely biased opinions in /r/soccer
                                        or busy building new things.</p>
                                    <p className='mt-1'>I'm most accessible via <button
                                        className='clean-button ml-1 underline mb-0'
                                        onClick={() => openExternalLink('https://twitter.com/ugupta41')}>
                                        Twitter</button> and tend to update about whatever
                                        I'm working there, so feel free to follow or send a dm there. :) </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap pt-2 border-bottom">
                        <div className="w-full lg:w-1/2">
                            <div className="">
                                <div className="flex flex-wrap">
                                    <img className="no-border mr-2" src="assets/images/used-product.png" alt='used-product'/>
                                    <h3>What it does?</h3>
                                </div>
                                <div className="p-1 mt-2">
                                    <ol>
                                        {features.map(item => {
                                            return <li key={item.id} className="mb-1 flex">
                                                <div className='content-center'>
                                                    <img className="no-border mr-1" src={item.icon} alt={item.icon}/>
                                                    <p>{item.text}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="">
                                <div className="flex">
                                    <img className="no-border mr-2" src="assets/images/hammer--v1.png" alt='hammer--v1'/>
                                    <h3>Why build it?</h3>
                                </div>
                                <div className="p-1 mt-2">
                                    <ol>
                                        {reasons.map(item => {
                                            return <li key={item.id} className="mb-1 flex">
                                                <div className='content-center'>
                                                    <img className="no-border mr-1" src={item.icon} alt={item.icon}/>
                                                    <p>{item.text}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className='mt-2'>
                        <div className='flex mb-4'>
                            <img className="no-border mr-2" src="assets/images/help.png" alt='help'/>
                            <h3>FAQs</h3>
                        </div>
                        <div className='mt-3'>
                            <h4>Is it completely free?</h4>
                            <p className='mt-1'>Yes, Powir is 100% free to download and use.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>Are the numbers displayed 100% correct?</h4>
                            <p className='mt-1'>Depends, Powir parses the raw reports generated from Windows and
                            does the computations of the various statistics and render the charts.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>What tooling was used to build the app?</h4>
                            <p className='mt-1'>Powir runs as an electron app (chromium web engine embedded) while using
                            React to facilitate the UI and data workflow.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>Does it share my data anywhere?</h4>
                            <p className='mt-1'>No, Powir will never share your data anywhere outside your local system,
                            the entire source code of the app is online for anyone to check. Infact, it never makes any
                            request to a server since there is none. Its simply a client sided app.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutWindow
