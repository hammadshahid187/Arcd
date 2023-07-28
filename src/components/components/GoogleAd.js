import React, { useEffect } from 'react'


const GoogleAd = () => {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <div>
            <ins className="adsbygoogle"
                style={{display:'block',border:'1px solid green'}}
                data-ad-client="ca-pub-3481641041122448"
                data-ad-slot="5092867743"
                data-ad-format="auto"
                data-adtest="on"
                data-full-width-responsive="true" />
        </div>
    )
}

export default GoogleAd