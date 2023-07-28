import React, { useContext } from 'react'
import { useLocation } from "react-router-dom"
import { AuthenticationContext } from '../../services/authentication/authentication.context';

const StockButton = ({ stock, percent, history }) => {
    const location = useLocation()
    const { userType } = useContext(AuthenticationContext);
    const click = (e) => {
        // e.stopPropagation()
        if (userType) {
            history.push(`/stock/${stock}`)
        } else {
            history.push(`/news/true#${Math.round(Math.random() * 1000)}`)
        }

    }
    return (
        // <div className="border rounded-3xl pl-2">
        <button className="border border-black rounded-xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl pl-1 pr-1 cursor-pointer" onClick={(e) =>
            click(e)}>
            <div className="flex text-xs">
                <p className="font-bold">{stock}</p>
                {percent ? <p className={`text-${percent > 0 ? "arca-blue" : "red-500"} ml-2`}>{percent}%</p> : <></>}
            </div>
            {/* {sign === "-" ?

                :

                <div className="flex font-bold text-sm">
                    <p className="">{stock}</p>
                    <p className="text-arca-blue ml-2">{sign}{percent}%</p>
                </div>
            } */}
        </button>
        // </div>
    )
}

export default StockButton
