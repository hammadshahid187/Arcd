import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { PlaidContext } from "../Plaid/Plaid.context";
import { db } from "../../config/Firebase";
import firebase from 'firebase'

const useNewsFetch = () => {
  const [news, setNews] = useState(null);
  const [newsFound, setNewsFound] = useState(new Set());
  const [myStockNews, setmyStockNews] = useState(null);
  const [carousel, setCarousel] = useState(null);
  const [selNewsNum, setSelNewsNum] = useState(0);
  const [hasMoreNews, setMoreNews] = useState(true);
  const [topNews, setTopNews] = useState(null);
  const [isNewsLoading, setNewsLoading] = useState(true);
  const { currentUser } = useContext(AuthenticationContext);
  const { holdings } = useContext(PlaidContext);

  useEffect(() => {

    if (currentUser) {
      async function fetchNews() {
        await fetchNewsData(holdings, currentUser.uid);
      }
      fetchNews();
    }
  }, [holdings, currentUser]);

  const extractTicker = async (securities) => {
    var tickerSymbolArray = [];
    for (const security of securities) {
      const ticker = security.ticker_symbol;
      if (ticker) {
        tickerSymbolArray.push(ticker);
      }
    }

    return tickerSymbolArray;
  };

  const extractStockTickerFromDb = async (tickers, uid) => {
    var response = await db
      .collection("follows")
      .where("user", "==", uid)
      .where("isFollowing", "==", true)
      .get();
    console.log("reached here");
    if (response) {
      console.log(response);
      response.docs.forEach((doc) => {
        // work to  do here
        var stock = doc.data().stock;
        if (!tickers.includes(stock)) {
          tickers.push(stock);
        }
      });
    }

    return tickers;
  };

  const selectTenMoreMyStockNews = () => {
    console.log("more news requested");
    let end;
    // add 9 more news if selnews less than news length
    if (selNewsNum + 9 < news.length) {
      // add 10 more news
      end = selNewsNum + 9;
      // has more news
      setMoreNews(true);
    } else {
      // set the remaining news
      end = news.length;
      // end of the news array
      setMoreNews(false);
    }
    // slices ten more newsE article from newsE object
    const newList = news.slice(selNewsNum, end);
    Array.prototype.push.apply(myStockNews, newList);
    setSelNewsNum(end);
    setmyStockNews(myStockNews);
  };

  const fetchNewsData = async (securities, uid) => {
    let updatedTickers = []
    updatedTickers = await extractStockTickerFromDb(updatedTickers, uid);
    
    const functionRef = firebase.app().functions('us-central1').httpsCallable('stocksNews');
    var newsEData = ""
    try{
      newsEData = await functionRef({
        stocks: updatedTickers,
    });
    }
    catch(error){
        console.log("firebase error", error);
        return;
    }

    const articleList = JSON.parse(newsEData.data);
    setNews(articleList);
    setTopNews(articleList.slice(0, 1)[0]);
    setCarousel(articleList.length?articleList.slice(1, 4):null);
    setmyStockNews(articleList.slice(4, 10));
    setSelNewsNum(10);
    console.log("loaded")
    setNewsLoading(false);
    // const shuffledArticles = shuffle(articleList);
    // setNews(shuffledArticles);
  };

  /**
   * Shuffles array in place.
   * @param {Array} a items An array containing the items.
   */
  function shuffle(arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
      j = Math.floor(Math.random() * (index + 1));
      x = arr[index];
      arr[index] = arr[j];
      arr[j] = x;
    }
    return arr;
  }
  return {
    news,
    isNewsLoading,
    myStockNews,
    topNews,
    selectTenMoreMyStockNews,
    hasMoreNews,
    carousel,
  };
};
export default useNewsFetch;
