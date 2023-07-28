import React from 'react'
import { useState, useEffect } from 'react'
import firebase from 'firebase'

const WatchlistSingle = ({ ticker,history }) => {

    const [err, setErr] = useState(false)
    const [data, setData] = useState({})

    useEffect(async () => {
        getStockData(ticker);
    }, [])

    const getStockData = async (ticker) => {
        console.log("list here")
        try {
            const functionRef = firebase.app().functions('us-central1').httpsCallable('stockSnapshot');
            var tickerData = ""
            try {
                tickerData = await functionRef({
                    stockName: ticker,
                });

                tickerData['data'] = JSON.parse(tickerData.data);
                
                console.log("list here", tickerData, ticker);

                if (tickerData.day.o == 0) {
                    throw "error";
                }
            }
            catch (error) {
                console.log("list err", error, ticker);
                const functionRef = firebase.app().functions('us-central1').httpsCallable('lastDayClose');
                var lastDayClose = ""

                lastDayClose = await functionRef({
                    stockName: ticker,
                });
                lastDayClose['data'] = JSON.parse(lastDayClose.data);

                var data = {
                    Close: (lastDayClose.data.results[0].c).toFixed(2),
                }

                // get open-close data for date before lastDayClose.data.results[0].t\
                // var days_behind = 1;
                var dayBefore = ""
                const functionRef2 = firebase.app().functions('us-central1').httpsCallable('stockOpenClose');
                var dayBefore = ""
                dayBefore = await functionRef2({
                    stockName: ticker,
                    time: lastDayClose.data.results[0].t
                });
                dayBefore['data'] = JSON.parse(dayBefore.data);

                data['Prev Close'] = (dayBefore.data.close).toFixed(2);
                var percent = (((data.Close - data['Prev Close']) / data['Prev Close']) * 100)
                tickerData = {
                    data: {
                        status: "success",
                        ticker: {
                            todaysChangePerc: percent,
                            lastTrade: {
                                p: (lastDayClose.data.results[0].c)
                            }
                        }
                    }
                }
            }

            if (tickerData.data.status != "NotFound") {
                setErr(false)
                setData({
                    name: ticker,
                    percent: (tickerData.data.ticker.todaysChangePerc).toFixed(2),
                    current: (tickerData.data.ticker.lastTrade.p).toFixed(2)
                })
            }
            else {
                setErr(true)
            }
        }
        catch (err) {
            console.log("list err 2",err, ticker);
            setErr(true)
        }
    }



    return (
        err == false ?
            (
                data.name != undefined ?
                    <div className="flex justify-between text-white py-5 items-center cursor-pointer watchlist-item" onClick={() => { history.push(`/stock/${data.name}`) }}>
                        <div className="font-semibold text-sm">{data.name}</div>
                        <div className="text-center text-xs">
                            ${data.current}
                            <div className={`text-${data.percent > 0 ? "arca-blue" : "red-500"} text-sm per`}>{data.percent > 0 ? "+" : ""}{data.percent}%</div>
                        </div>
                    </div>
                    :

                    <div className="rounded-md w-full h-12 mx-auto py-4 mt-2">
                        <div className="animate-pulse w-full h-full flex justify-between">
                            <div className="bg-gray-300 w-1/4 h-full mb-2 rounded"></div>
                            <div className="bg-gray-300 w-1/4 h-full mb-2 rounded"></div>
                        </div>
                    </div>

            )
            :
            <div></div>
    )
}

export default WatchlistSingle