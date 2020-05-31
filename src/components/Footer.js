import React from "react";

function Footer() {
    return (
        <div className="custom-border border-top">
            <div className='mt-2 flex' style={{
                justifyContent: "space-between"
            }}>
                <div>
                    <div className="flex">
                        <img className='no-border mr-2' src="https://img.icons8.com/cotton/24/000000/copyright.png" alt="heart"/>
                        <h5><a href="https://slapbot.me">Ujjwal Gupta (Slapbot)</a></h5>
                    </div>
                </div>
                <div>
                    <a href="https://icons8.com/">Many thanks to Icons8 for all of the lovely icons</a>
                </div>
            </div>
        </div>
    )
}

export default Footer
