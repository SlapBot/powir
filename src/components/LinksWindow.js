import React from "react";
import openExternalLink from './utils/openExternalLink'

function LinksWindow() {
    let shareLinks = [
        {
            'id': 0,
            'text': 'Copy Link!',
            'iconUrl': 'assets/images/link.png',
            'url': 'https://powir.slapbot.me'
        },{
            'id': 1,
            'text': 'Tweet about it!',
            'iconUrl': 'assets/images/twitter-circled.png',
            'url': 'https://twitter.com/intent/tweet?url=powir.slapbot.me&text=Check%20out%20this%20open%20source%20windows%20battery%20monitoring%20app:&hashtags=powir'
        },{
            'id': 2,
            'text': 'Share on Facebook!',
            'iconUrl': 'assets/images/facebook.png',
            'url': 'http://www.facebook.com/sharer.php?s=100&p[title]=Powir&p[url]=powir.slapbot.me'
        },{
            'id': 3,
            'text': 'Mail to someone!',
            'iconUrl': 'assets/images/email-sign.png',
            'url': 'mailto:?subject=Powir: open source windows based battery monitoring app&amp;body=Check out app at: https://www.powir.slapbot.me'
        },{
            'id': 4,
            'text': 'Share on Linkedin!',
            'iconUrl': 'assets/images/linkedin-circled.png',
            'url': 'https://www.linkedin.com/sharing/share-offsite/?url=powir.slapbot.me'
        },{
            'id': 5,
            'text': 'Share on Reddit!',
            'iconUrl': 'assets/images/reddit.png',
            'url': 'https://www.reddit.com/submit?url=https://powir.slapbot.me&title=Powir:%20Open%20Source%20Windows%20Based%20Battery%20Monitoring%20App'
        },
    ]
    let helpLinks = [
        {
            'id': 0,
            'heading': 'Issues/Bugs',
            'iconUrl': 'assets/images/repository.png',
            'url': 'https://github.com/slapbot/powir/issues',
            'message': 'Looking for any help related to the product or want to report a bug? Feel free to raise an issue on Github'
        },{
            'id': 1,
            'heading': 'Chat/Updates',
            'iconUrl': 'assets/images/comments.png',
            'url': 'https://twitter.com/ugupta41',
            'message': 'Want to share some insight without signing up on Github or looking for updates? Follow me @ugupta41 on Twitter'
        },{
            'id': 2,
            'heading': 'Feedback/Enquiry',
            'iconUrl': 'assets/images/mail-contact.png',
            'url': 'mailto:ugupta41@gmail.com',
            'message': 'Old school? Write me a mail at: ugupta41@gmail.com'
        },
    ]

    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full">
                    <div className='border-bottom pb-2'>
                        <div className='mt-2 mb-4'>
                            <div className="flex">
                                <img className='no-border mr-2' src="assets/images/help.png" alt='help'/>
                                <h3>Help</h3>
                            </div>
                            <div>
                                <span>Looking for any kind of help?</span>
                            </div>
                        </div>
                        {helpLinks.map(helpLink => {
                            return <div key={helpLink.id}>
                                <div className='flex mt-2'>
                                    <div className='content-center'>
                                        <img className='no-border mr-2' src={helpLink.iconUrl} alt={helpLink.iconUrl}/>
                                        <h4><button
                                            className='clean-button'
                                            onClick={() => openExternalLink(helpLink.url)}>{helpLink.heading}
                                        </button></h4>
                                    </div>
                                </div>
                                <span className='mt-1'>{helpLink.message}</span>
                            </div>
                        })}

                    </div>
                    <div className='pb-2'>
                        <div>
                            <div className='mt-2 mb-4'>
                                <div className="flex">
                                    <img className='no-border mr-2' src="assets/images/share--v1.png" alt='share--v1'/>
                                    <h3>Share</h3>
                                </div>
                                <div>
                                    <span>Liked the product? Share the good word among your friends :)</span>
                                </div>
                            </div>
                        </div>
                        {shareLinks.map(shareLink => {
                            return <div key={shareLink.id} className='flex mt-2'>
                                <div className='content-center'>
                                    <img className='no-border mr-2' src={shareLink.iconUrl} alt={shareLink.iconUrl}/>
                                    <h4><button className='clean-button' onClick={() => openExternalLink(shareLink.url)}>
                                        {shareLink.text}
                                    </button></h4>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinksWindow
