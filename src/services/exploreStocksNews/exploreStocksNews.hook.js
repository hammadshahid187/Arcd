import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context.js";

async function getNewsData() {
    let requiredNews = [];
    const snapshot = await firebase
        .firestore()
        .collection("scrappedNews")
        .orderBy("added_utc", "desc")
        .get();
    snapshot.forEach((doc) => {
        requiredNews.push({ id: doc.id, data: doc.data() });
    });

    console.log("required-news", requiredNews);
    return requiredNews;
}

const useExploreStocksNewsFetch = () => {
    const [newsE, setNewsE] = useState(null);
    const [myStockNewsE, setmyStockNewsE] = useState(null);
    const [carouselE, setCarouselE] = useState(null);
    const [selNewsENum, setSelNewsENum] = useState(0);
    const [hasMoreNewsE, setMoreNewsE] = useState(true);
    const [topNewsE, setTopNewsE] = useState(null);
    const [tickerPercentageMap, setTickerPercentageMap] = useState(new Map());
    const [isNewsELoading, setNewsELoading] = useState(true);

    const { userType, isLoggedIn, isLoading, currentUser } = useContext(
        AuthenticationContext
    );

    const selectTenMoreMyStockNewsE = () => {
        let end;
        // add 9 more newsE if selnewsE less than newsE length
        if (selNewsENum + 9 < newsE.length) {
            // add 10 more newsE
            end = selNewsENum + 9;
            // has more newsE
            setMoreNewsE(true);
        } else {
            // set the remaining newsE
            end = newsE.length;
            // end of the newsE array
            setMoreNewsE(false);
        }
        // slices ten more newsE article from newsE object
        const newList = newsE.slice(selNewsENum, end);
        Array.prototype.push.apply(myStockNewsE, newList);

        // increment
        setSelNewsENum(end);

        // fill my stock newsE
        setmyStockNewsE(myStockNewsE);
    };

    const getTickerPercentage = async (ticker) => {
        const functionRef = firebase
            .app()
            .functions("us-central1")
            .httpsCallable("stockSnapshot");
        var tickerData = "";

        try {
            tickerData = await functionRef({
                stockName: ticker,
            });
            tickerData["data"] = JSON.parse(tickerData.data);

            if (tickerData.day.o == 0) {
                throw "error";
            }

            return tickerData.data.ticker.todaysChangePerc.toFixed(2);
        } catch (error) {
            const functionRef = firebase
                .app()
                .functions("us-central1")
                .httpsCallable("lastDayClose");
            var lastDayClose = "";

            lastDayClose = await functionRef({
                stockName: ticker,
            });
            lastDayClose["data"] = JSON.parse(lastDayClose.data);

            var data = {
                Close: lastDayClose.data.results[0].c.toFixed(2),
            };

            // get open-close data for date before lastDayClose.data.results[0].t\
            // var days_behind = 1;
            var dayBefore = "";
            const functionRef2 = firebase
                .app()
                .functions("us-central1")
                .httpsCallable("stockOpenClose");
            var dayBefore = "";
            dayBefore = await functionRef2({
                stockName: ticker,
                time: lastDayClose.data.results[0].t,
            });
            dayBefore["data"] = JSON.parse(dayBefore.data);

            data["Prev Close"] = dayBefore.data.close.toFixed(2);
            var percent = (
                ((data.Close - data["Prev Close"]) / data["Prev Close"]) *
                100
            ).toFixed(2);

            return percent;
        }
    };

    const fetchTickerPercentage = async (ticker) => {
        let percentage;
        if (tickerPercentageMap.has(ticker)) {
            percentage = tickerPercentageMap.get(ticker);
            console.log("percentage from map: " + percentage);
        } else {
            percentage = await getTickerPercentage(ticker);
            setTickerPercentageMap(tickerPercentageMap.set(ticker, percentage));
        }
        console.log("fetchTickerPercentage", percentage);
        return percentage;
    };

    const fetchAllNewsEData = async () => {
        let tickers = [
            "AMC",
            "GME",
            "DIS",
            "AAPL",
            "ACB",
            "MSFT",
            "BYND",
            "ZM",
            "GOOG",
            "AMZN",
            "NFLX",
            "FB",
            "SHOP",
            "RBLX",
            "TSLA",
            "COIN",
            "NVDA",
            "PTON",
        ];

        let newsEData = [];
        try {
            newsEData = await getNewsData();
        } catch (error) {
            console.log("firebase error", error);
            return;
        }

        // const articleList = newsEData;

        // as this page is not updated, we can load the ticker percentage here itself
        // create a set with ticker names from articlesList
        // const tickerSet = new Set();
        // articleList.forEach(article => {

        //     for (let index = 0; index < Math.min(2,article.tickers.length); index++) {
        //         tickerSet.add(article.tickers[index]);
        //     }
        // });

        // // create a map with ticker name as key and percentage as value
        // const tickerMap = new Map();
        // // create list fropm tickerSet
        // const tickerList = Array.from(tickerSet);
        // console.log("tickerPercentageMap",tickerList.length)
        // for(const ticker of tickerList ) {
        //     // fetch the percentage
        //     var per = await getTickerPercentage(ticker);
        //     console.log("tickerPercentageMap",per);
        //     tickerMap.set(ticker, per);
        //     console.log("tickerPercentageMap",tickerMap);
        // };

        setNewsE(newsEData);
        setTopNewsE(newsEData.slice(0, 1)[0]);
        setCarouselE(newsEData.length ? newsEData.slice(1, 4) : null);
        setmyStockNewsE(newsEData.slice(1, 10));
        setSelNewsENum(10);
        setNewsELoading(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            async function fetchNews() {
                await fetchAllNewsEData();
            }
            fetchNews();
        }
    }, [isLoggedIn]);

    return {
        newsE,
        isNewsELoading,
        myStockNewsE,
        topNewsE,
        selectTenMoreMyStockNewsE,
        hasMoreNewsE,
        carouselE,
        fetchTickerPercentage,
    };
};
export default useExploreStocksNewsFetch;
