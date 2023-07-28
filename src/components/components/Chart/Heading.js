const Heading = (props) =>
{
    const sign = props.sign;
    return( 
    
    <div>

        <p>{props.stockName}</p>
        
        <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
                <p className="text-3xl font-bold">{props.currentPrice}</p>
                <p className="text-xl font-bold">USD</p>
            </div>
            <div className="flex items-center">
                {
                    sign === "+"
                        ?
                        <div className="flex bg-arca-blue rounded-md pl-1 pr-1 items-center text-white">
                            <p>{sign}</p>
                            <p>{props.currentPercent}%</p>
                        </div>
                        :
                        <div className="flex bg-arca-red rounded-md pl-1 pr-1 items-center text-white">
                            <p>{sign}</p>
                            <p>{props.currentPercent}%</p>
                        </div>
                }
            </div>

        </div>
    </div>)
}

export default Heading;