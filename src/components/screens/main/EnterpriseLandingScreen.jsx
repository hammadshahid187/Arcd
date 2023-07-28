import moment from "moment";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import EnterpriseCard from "../../components/Cards/EnterpriseCard";
import NewsBulletinCard from "../../components/Cards/NewsBulletinCard";
import CluterCard from "../../components/Cards/ClusterCard";
import KeyPointCard from "../../components/Cards/KeyPointCard";
import TradeCard from "../../components/Cards/TradeCard";
import { SwiperSlide } from "swiper/react";
import TradeCardCarousel from "../../components/Carousel/TradecardCarousel";
import StockAnalogyCard from "../../components/Cards/StockAnalogyCard";
import EnterPriseNav from "../../components/Navbar/EnterPriseNav";
import TradingViewWidget from "./tradingview-widget";
import { ExploreStockNewsContext } from "../../../services/exploreStocksNews/exploreStocksNews.context";

const EnterpriseLandingScreen = ({ match, history }) => {
  const { userType } = useContext(AuthenticationContext);
  const [modal, setModal] = useState("");
  const monthName = moment().format("MMMM");

  const {
    isNewsELoading,
    myStockNewsE,
    topNewsE,
    selectMoreNewsE,
    hasMoreNewsE,
  } = useContext(ExploreStockNewsContext);

  return (
    <div className="">
      <EnterPriseNav />
      <div className="container-fluid md:px-7 px-3 mx-auto pt-3 pb-3 mt-3 overflow-hidden">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-3 col-span-12">
            <EnterpriseCard title={"News Bulletin"} maxHeight={"100vh"}>
              {
                myStockNewsE.map((news, key) => {
                  return (
                    <>
                      <NewsBulletinCard
                        key={key}
                        title={news.data.article_heading}
                        published_utc={news.data.added_utc}
                        description={news.data.description}
                        tickers={news.data.tickers}
                        history={history}
                        newsData={news}
                      />
                    </>
                  );
                })
              }

            </EnterpriseCard >
          </div>
          <div className="lg:col-span-5 col-span-12 flex flex-col gap-7 md:px-2">
            <EnterpriseCard
              title={"Trending Trades"}
            // maxHeight={"40vh"}
            >
              {/* <div className="first:pl-1 hide-scrollbar flex gap-6 w-full snap-proximity snap-x overflow-x-auto">
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
                  <TradeCard />
              </div> */}
              <div className="flex flex-row">
                <TradeCardCarousel>
                  <SwiperSlide style={{ flex: 1 }}>
                    <TradeCard />
                  </SwiperSlide>
                  <SwiperSlide style={{ flex: 1 }}>
                    <TradeCard />
                  </SwiperSlide>
                  <SwiperSlide style={{ flex: 1 }}>
                    <TradeCard />
                  </SwiperSlide>
                </TradeCardCarousel>
              </div>
            </EnterpriseCard>

            <EnterpriseCard
              title={"Realtime Event Taxonomy"}
              maxHeight={"60vh"}
            >
              <CluterCard title={"Cluster 1"} pinned={true} />
              <CluterCard title={"Cluster 2"} pinned={false} />
              <CluterCard title={"Cluster 2"} pinned={false} />
              <div className="flex gap-5">
                <KeyPointCard />
                <KeyPointCard />
              </div>
            </EnterpriseCard>
          </div>

          <div className="lg:col-span-4 col-span-12">
            <div className="flex flex-col gap-5">
              <EnterpriseCard maxHeight="60vh" month={monthName}>
                <StockAnalogyCard />
              </EnterpriseCard>
              <EnterpriseCard>
                <TradingViewWidget />
              </EnterpriseCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLandingScreen;
