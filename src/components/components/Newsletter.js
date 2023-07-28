import React from 'react'

const Newsletter = () => {
    return (
        <div className="relative mb-20 w-full h-full">
            <div className="absolute top-0 left-0  mt-28 ml-24 ">
                <p className="text-white text-3xl font-bold">Stay current with our monthly newsletter.</p>

                <div className="absolute top-0 left-0 mt-28 justify-center items-center text-left">
                    <p className="text-white text-lg">Subscribe</p>
                    <div className="relative flex mt-2">
                        <input type="text" className="h-12 w-18 pl-6 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="youemail@here.com" />
                        <div className="absolute top-0 right-0">
                            <button className="h-12 w-20 text-white rounded-r-lg bg-arca-blue">Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <img className="object-contain w-full" src="/image.png" alt="NEWSLETTER"/>
        </div>
    )
}

export default Newsletter
