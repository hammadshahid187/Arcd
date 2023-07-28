import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// import NewsFlex from "../../components/NewsFlex";
// import Watchlist from "../../components/Watchlist";
import NewsGrid from "../../components/NewsGrid";
import Link from "../../components/Link";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { PlaidContext } from "../../../services/Plaid/Plaid.context";
import useNewsFetch from "../../../services/exploreStocksNews/exploreStocksNews.hook";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
// import NewsMain from "../../components/NewsMain";
import CarouselComponent from "../../components/Carousel/Carousel";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const StocksScreen = ({ history }) => {
  const [nextCursorUrl, setNextCursorUrl] = useState("");

  const { height, width } = useWindowDimensions();

  const [data, setData] = useState([]);
  const [mainNews, setMainNews] = useState([]);

  const [all, setAll] = useState(false);

  const [idsMain, setIdsMain] = useState([]);
  const [stockArr, setStockArr] = useState([]);

  const [showViewMore, setShowViewMore] = useState(true);

  const { currentUser } = useContext(AuthenticationContext);
  const { accessToken } =
    useContext(PlaidContext);

  const {
    myStockNews,
    isNewsLoading,
    topNews,
    hasMoreNews,
    selectTenMoreMyStockNews,
    carousel,
  } = useNewsFetch();

  return (
    <div className="">
      <Navbar history={history} activeNav={"stocks"} />

      <div className="pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 mb-12 md:mb-16 lg:mb-20">
        <div className="flex justify-center ...">
          <div className="mb-10">{accessToken === null ? <Link /> : <></>}</div>
          {accessToken != null && isNewsLoading ? <LoadingSpinner /> : <></>}
        </div>

        <div className="pb-20">
          <CarouselComponent data={carousel} />
        </div>

        {/* <div className="mb-10">
          <Watchlist list={stockArr} history={history} />
        </div> */}
        <div className="space-y-4 lg:space-y-16">
          {/* {news &&  
            news.map((article) => {
              return (
                
              );  
            })} */}
        </div>

        <NewsGrid data={myStockNews} history={history} loaded={myStockNews}/>
      </div>
      <div>{/* <Newsletter /> */}</div>

      <div className="pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 mb-12 md:mb-16 lg:mb-20">
        <NewsGrid data={data} history={history} loaded={data.length} />
      </div>
      <div className="flex justify-center">
        {hasMoreNews && !isNewsLoading && (
          <button
            className="mb-14 pl-6 pr-6 md:pr-6 md:pl-6 pt-1 pb-1 border border-arca-blue rounded-3xl cursor-pointer"
            onClick={() => {
              selectTenMoreMyStockNews();
            }}
          >
            <p className="font-bold text-arca-blue text-lg md:text-lg lg:text-lg font-sourceSansPro">
              VIEW MORE
            </p>
          </button>
        )}
      </div>
      {accessToken !== null ? (
        <div className="bottom-0 w-100">
          <Footer history={history} ad={false} />
        </div>
      ) : (
        <div className="bottom-0 absolute w-100">
          <Footer history={history} ad={false} />
        </div>
      )}
    </div>
  );
};

export default StocksScreen;
