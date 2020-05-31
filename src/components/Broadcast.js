import React, {useState} from "react";

function Broadcast() {
    const [shouldRender, setShouldRender] = useState(true)
    function closeAlert() {
        setShouldRender(false)
    }
    function render() {
        return (
            <div>
                <div className="alert alert-secondary">
                    <div className='flex' style={{
                        justifyContent: 'space-between'
                    }}>
                        <p>Creator [https://github.com/slapbot] of this app is looking for a job. If you know of any openings, kindly inform him! :)</p>
                        <img onClick={closeAlert} style={{
                            cursor: 'pointer'
                        }} src="https://img.icons8.com/doodle/20/000000/delete-sign.png"/>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            {shouldRender ? render() : null}
        </div>
    )
}

export default Broadcast