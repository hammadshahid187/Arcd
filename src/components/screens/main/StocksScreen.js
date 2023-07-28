import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import NewsFlex from "../../components/NewsFlex";
import Watchlist from "../../components/Watchlist";
import NewsGrid from "../../components/NewsGrid";
import Link from "../../components/Link";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { PlaidContext } from "../../../services/Plaid/Plaid.context";
// import useNewsFetch from "../../../services/exploreStocksNews/exploreStocksNews.hook";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
// import NewsMain from "../../components/NewsMain";
import CarouselComponent from "../../components/Carousel/Carousel";
import Portfolio from "../../components/Portfolio";
import { NewsContext } from "../../../services/news/news.context";
import useNewsFetch from "../../../services/news/news.hook";
import { db } from "../../../config/Firebase"

const StocksScreen = ({ history }) => {
  const [holdingTickers, setHoldingTickers] = useState([]);
  // Contexts
  const { secondaryAccessTokens } = useContext(PlaidContext);
  const { holdings } = useContext(PlaidContext);
  const { currentUser } = useContext(AuthenticationContext);
  // const { myStockNews, isNewsLoading, hasMoreNews, selectMoreNews, carousel, newsProvider, setStateNewsProvider } =
  //   useContext(NewsContext);
  const {
    news,
    isNewsLoading,
    myStockNews,
    topNews,
    selectTenMoreMyStockNews,
    hasMoreNews,
    carousel,
  } = useNewsFetch();

  const selectMoreNews = selectTenMoreMyStockNews;


  useEffect(async () => {
    var updatedTickers = await extractStockTickerFromDb(currentUser.uid);
    setHoldingTickers(updatedTickers);

  }, [])


  const extractStockTickerFromDb = async (uid) => {
    var tickers = new Set();
    var response = await db
      .collection("follows")
      .where("user", "==", uid)
      .where("isFollowing", "==", true)
      .get();

    if (response) {
      response.docs.forEach((doc) => {
        // work to  do here
        var stock = doc.data().stock;
        if (!tickers.has(stock)) {
          tickers.add(stock);
        }
      });
    }

    return Array.from(tickers);
  };

  return (
    <div className="">

      <Navbar history={history} activeNav={"stocks"} />
      <div className="container mx-auto ">
        {console.log("hold render")}

        <div className="pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 mb-12 md:mb-16 lg:mb-20">
          {/* <div className="flex justify-center ...">
            
            <div className="mb-5">{accessToken === null ? <Link /> : <></>}</div>
            
          </div> */}

          <div className="pb-10">
            <CarouselComponent data={carousel} />
          </div>
          <div className="w-full mx-auto pb-10 md:hidden">
            {
              holdingTickers.length ? <Watchlist list={holdingTickers} history={history} /> : <></>
            }
          </div>
          <div>
            {
              holdingTickers.length ?
                <div className="flex mx-auto items-stretch space-x-4 mb-10" style={{ maxHeight: 800 }}>
                  {<Portfolio symbols={holdingTickers} history={history} secondaryAccessTokens={secondaryAccessTokens} />}
                </div>
                : <></>

            }
          </div>
          {console.log("mystockNews", myStockNews)}
          <NewsGrid data={myStockNews} history={history} loaded={myStockNews} />
        </div>
        <div className="flex justify-center">
          {(hasMoreNews && myStockNews && myStockNews.length > 0 && !isNewsLoading) ? (
            <button
              className="mb-14 pl-6 pr-6 md:pr-6 md:pl-6 pt-1 pb-1 border border-arca-blue rounded-3xl cursor-pointer"
              onClick={() => {
                selectMoreNews();
              }}
            >

              <p className="font-bold text-arca-blue text-lg md:text-lg lg:text-lg font-sourceSansPro">
                VIEW MORE
              </p>
            </button>
          ) :
            <div className="mb-52">
              Start Following Stocks
            </div>
          }
        </div>
      </div>
      <div className={(!myStockNews || myStockNews.length ? "" : "absolute") + " bottom-0 w-100"}>
        <Footer history={history} ad={false} />
      </div>
      {/* {!isNewsLoading ? (
      ) : (
        <div className="bottom-0 absolute w-100">
          <Footer history={history} ad={false} />
        </div>
      )} */}

    </div>
  );
};

export default StocksScreen;
