import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import firebase from 'firebase'
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

const WatchlistVertical = ({ list, history }) => {

  const [stockDataArr, setStockDataArr] = useState([])
  const [error, setError] = useState(false)

  const getStockData = async () => {
    var tempArr = []
    console.log("inside func", list)
    for (let index = 0; index < list.length; index++) {
      const stock = list[index];
      try {
        const functionRef = firebase.app().functions('us-central1').httpsCallable('stockSnapshot');
        var tickerData = ""
        try {
          tickerData = await functionRef({
            stockName: stock,
          });

          tickerData['data'] = JSON.parse(tickerData.data);
          console.log("firebase", tickerData, stock);

          if (tickerData.day.o == 0)
          {
            // throw error
            throw "error";
          }
        }
        catch (error) {
          console.log("status rit", error, stock);

          const functionRef = firebase.app().functions('us-central1').httpsCallable('lastDayClose');
          var lastDayClose = ""

          lastDayClose = await functionRef({
            stockName: stock,
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
            stockName: stock,
            time: lastDayClose.data.results[0].t
          });
          dayBefore['data'] = JSON.parse(dayBefore.data);



          data['Prev Close'] = (dayBefore.data.close).toFixed(2);
          var percent = (((data.Close - data['Prev Close']) / data['Prev Close']) * 100)
          tickerData = {}
          tickerData['data'] = {}
          tickerData['data']['status'] = "success"
          tickerData['data']['ticker'] = {}
          tickerData['data']['ticker'].todaysChangePerc = percent;
          tickerData['data']['ticker'].lastTrade = {};
          tickerData['data']['ticker'].lastTrade.p = (lastDayClose.data.results[0].c)

        }

        console.log("status ri", stock, tickerData.data.status)
        if (tickerData.data.status != "NotFound")
          tempArr.push({ name: stock, percent: (tickerData.data.ticker.todaysChangePerc).toFixed(2), current: (tickerData.data.ticker.lastTrade.p).toFixed(2) })
      }
      catch (err) {
        console.log("main status ri", err, stock);
        continue
      }
    }
    if (tempArr.length <= 0) {
      setError(true)
    }
    return tempArr
  }

  useEffect(async () => {
    setStockDataArr(await getStockData())
    return () => {
      console.log("unmount")
      setStockDataArr([])
    }
  }, [])

  return (
    <>
      {
        error ?
          <div className="h-5/6 flex items-center justify-center text-white">
            Start following more stocks
          </div> :

          <>


            {stockDataArr.length ?
              <div>
                <div>
                  {stockDataArr.map((stock, key) => {
                    return (
                      <div key={key} className="flex justify-between text-white py-5 items-center cursor-pointer watchlist-item" onClick={() => { history.push(`/stock/${stock.name}`) }}>
                        <div className="font-semibold text-sm">{stock.name}</div>
                        <div className="text-center text-xs">
                          ${stock.current}
                          <div className={`text-${stock.percent > 0 ? "arca-blue" : "red-500"} text-sm per`}>{stock.percent > 0 ? "+" : ""}{stock.percent}%</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 text-center">
                  Start following more stocks
                </div>
              </div>
              :
              [...Array(6)].map((key) => {
                return (
                  <div key={key}>
                    <div className="rounded-md w-full h-12 mx-auto py-4 mt-2">
                      <div className="animate-pulse w-full h-full flex justify-between">
                        <div className="bg-gray-300 w-1/4 h-full mb-2 rounded"></div>
                        <div className="bg-gray-300 w-1/4 h-full mb-2 rounded"></div>
                      </div>
                    </div>
                  </div>
                )
              })
            } </>
      }
    </>

  );
};

export default WatchlistVertical;
