const Details = ({ details }) => {
    const objectList = Object.keys(details).map((k, key) => {
        return (
            <div className="flex justify-between md:48">
                <p className="text-gray-500">{k} : </p>
                <p>{details[k]}</p>
            </div>
        )
    });

    return (

        <div className="">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-96 gap-y-4 bg-gray-200 px-10 py-5 rounded-sm">
                {objectList}
                {/* <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">Open</p>
            <p>{details.open}</p>
        </div>
        <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">High</p>
            <p>{details.high}</p>
        </div>
        <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">Close</p>
            <p>{details.close}</p>
        </div>
        <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">Low</p>
            <p>{details.low}</p>
        </div>
        <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">Pre</p>
            <p>{details.preMarket}</p>
        </div>
        <div className="flex justify-between w-32 md:48">
            <p className="text-gray-500">Vol</p>
            <p>{details.volume}</p>
        </div> */}

            </div>
        </div>
    )
}

export default Details;