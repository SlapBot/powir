import React, {useState} from "react";
import SidebarRow from "./sub-components/SidebarRow";
import openExternalLink from "./utils/openExternalLink";

function Sidebar(props) {
    const [sidebarRows, setSideBarRows] = useState([
        {
            'index': 0,
            'name': 'Information',
            'rootClass': 'mt-6',
            'liClass': 'mb-3',
            'spanClass': 'border border-primary p-1'
        },{
            'index': 1,
            'name': 'About',
            'rootClass': '',
            'liClass': '',
            'spanClass': ''
        },{
            'index': 2,
            'name': 'Actions',
            'rootClass': '',
            'liClass': '',
            'spanClass': ''
        },{
            'index': 3,
            'name': 'Links',
            'rootClass': '',
            'liClass': '',
            'spanClass': ''
        }
    ])
    function notifyBody(sidebarIndex) {
        setSideBarRows(sidebarRows.map((item, index) => {
            if (index === sidebarIndex) {
                return {...item, liClass: 'mt-3 mb-3', spanClass: 'border border-primary p-1'}
            }
            return {...item, liClass: '', spanClass: ''}
        }))
        props.notifyContentWindow(sidebarIndex)
    }

    return (
        <div className="fixed">
            <ul>
                {sidebarRows.map(
                    item => <SidebarRow key={item.index} value={item} notifyBody={notifyBody}/>
                )}
            </ul>
            <div className="border-top mt-8 pt-8">
                <p>Made With</p>
                <img className='no-border' src="assets/images/like--v1.png" alt="heart" />
                <p>By <button className='clean-button underline' onClick={() => openExternalLink("https://slapbot.me")}>
                    Slapbot
                </button></p>
                <p className="text-xs sidebar-footnote">100 % open source</p>
            </div>
        </div>
    )
}

export default Sidebar
