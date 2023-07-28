import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import firebase from 'firebase'
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);

const Watchlist = ({ list, history }) => {

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
        }
        catch (error) {
          console.log("status ri", error, stock);

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
        error ? <></> :

          <Swiper
            spaceBetween={1}
            slidesPerView={3}
            breakpoints={
              {
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                }
              }
            }
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSlideChange={
              () => console.log('slide change')
            }
            onSwiper={
              (swiper) => console.log(swiper)
            }
            navigation={false}
            pagination={false}
            mousewheel={true}
            keyboard={true}
            className='mySwiper'
            cssMode={true}>

            {stockDataArr.length ?
              stockDataArr.map((stock, key) => {
                return (
                  <SwiperSlide key={key}>
                    <div className="flex pr-6 space-x-2 items-center cursor-pointer" onClick={() => {
                      history.push(`/stock/${stock.name}`)
                    }}>
                      <div className={`h-20 bg-arca-${stock.percent > 0 ? "blue" : "red"} w-2 rounded-sm`}>
                      </div>
                      <div>
                        <div className="">
                          <p className="text-lg text-black">{stock.name}</p>
                        </div>
                        <div className="">
                          <p className="text-black">${stock.current}</p>
                          <p className={`text-${stock.percent > 0 ? "arca-blue" : "red-500"} text-sm`}>{stock.percent}%</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
              :
              [...Array(9)].map((key) => {
                return (
                  <SwiperSlide key={key}>
                    <div className="rounded-md w-32 h-24 mx-auto">
                      <div className="animate-pulse w-full h-full space-x-4">
                        <div className="bg-gray-300 w-full h-full mb-2 rounded"></div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            } </Swiper>
      }
    </>

  );
};

export default Watchlist;
