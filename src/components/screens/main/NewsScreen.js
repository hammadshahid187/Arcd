import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import NewsLoading from "../../components/NewsLoading";
import NewsMain from "../../components/NewsMain";
import Footer from "../../components/Footer";

import NewsGrid from "../../components/NewsGrid";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { ExploreStockNewsContext } from "../../../services/exploreStocksNews/exploreStocksNews.context";
import { NavBeforeLogin } from "../../components/NavBeforeLogin";

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

const NewsScreen = ({ match, history }) => {
    const [modal, setModal] = useState("");
    const { userType } = useContext(AuthenticationContext);
    const {
        isNewsELoading,
        myStockNewsE,
        topNewsE,
        selectMoreNewsE,
        hasMoreNewsE,
    } = useContext(ExploreStockNewsContext);

    useEffect(() => {
        // parameter signin
        if (match.params.signIn == "true") {
            setModal("login");
        }
        console.log(match.params);
    }, [window.location.href]);

    useEffect(() => {
        const scriptTag = document.createElement("script");

        scriptTag.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        scriptTag.async = true;
        scriptTag.innerHTML = `{
                    "symbols": [
                        {
                            "proName": "FOREXCOM:SPXUSD",
                            "title": "S&P 500"
                        },
                        {
                            "proName": "FOREXCOM:NSXUSD",
                            "title": "US 100"
                        },
                        {
                            "proName": "FX_IDC:EURUSD",
                            "title": "EUR/USD"
                        },
                        {
                            "proName": "BITSTAMP:BTCUSD",
                            "title": "Bitcoin"
                        }, {
                            "proName": "BITSTAMP:ETHUSD",
                            "title": "Ethereum"
                        }
                    ],
                    "showSymbolLogo": true,
                    "colorTheme": "light",
                    "isTransparent": true,
                    "displayMode": "adaptive",
                    "locale": "en"
                }`;

        // document.getElementById('market').appendChild(scriptTag);
        // append scriptTag to the elements with className 'market' append to first if screen size is less than 768px
        if (window.innerWidth < 768) {
            document.getElementsByClassName("market")[0].appendChild(scriptTag);
        }
        // append scriptTag to the elements with className 'market' append to second if screen size is greater than 768px
        else {
            document.getElementsByClassName("market")[1].appendChild(scriptTag);
        }

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    console.log("news-grid", myStockNewsE);

    return (
        <div>
            {userType ? (
                <Navbar
                    history={history}
                    activeNav={"news"}
                    user={userType ? true : false}
                />
            ) : (
                <NavBeforeLogin modal={modal} setModal={setModal} />
            )}
            <div className="container mx-auto pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 xl:pl-32 xl:pr-32 mb-12 md:mb-16 lg:mb-20">
                <div className="market mb-10"></div>
                {/* <div className="flex justify-center ...">
          {isNewsELoading ? <LoadingSpinner /> : <></>}
        </div> */}
                {topNewsE ? (
                    <NewsMain
                        published_utc={topNewsE.data.added_utc}
                        publisher_name={topNewsE.data.source}
                        title={topNewsE.data.article_heading}
                        author={topNewsE.author}
                        tickers={topNewsE.tickers}
                        description={topNewsE.data.description}
                        image_url={topNewsE.data.image_url}
                        article_url={topNewsE.data.darticle_url}
                        key={`${topNewsE.id}`}
                        id={topNewsE.id}
                        history={history}
                        likesRandom={Math.floor(Math.random() * 400 + 50)}
                        isLoading={isNewsELoading}
                    />
                ) : (
                    <NewsLoading />
                )}

                <div className="market mb-10"></div>

                <NewsGrid
                    className="mt-5"
                    data={myStockNewsE}
                    history={history}
                    loaded={myStockNewsE}
                    loadAds={true}
                    isLoading={isNewsELoading}
                />
            </div>
            <div className="flex justify-center">
                {hasMoreNewsE && !isNewsELoading && (
                    <button
                        className="mb-14 pl-6 pr-6 md:pr-6 md:pl-6 pt-1 pb-1 border border-arca-blue rounded-3xl cursor-pointer"
                        onClick={() => {
                            selectMoreNewsE();
                        }}
                    >
                        <p className="font-bold text-arca-blue text-lg md:text-lg lg:text-lg font-sourceSansPro">
                            VIEW MORE
                        </p>
                    </button>
                )}
            </div>

            <Footer history={history} ad={userType == "Basic" ? true : false} />
        </div>
    );
};

export default NewsScreen;
