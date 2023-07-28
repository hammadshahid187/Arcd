import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import Tag from "../Tags/Tags";
import NewsComments from "../Comments/NewsComments";
import AddComment from "../Comments/AddCommment";
import NewsDetailsCarousel from "../Carousel/NewsDetailsCarousel";
import NewsDetailsCard from "../Cards/NewsDetailsCard";
import NewsCard from "../Cards/NewsCard";
import moment from "moment-timezone";
import CustomDrawer from "../../components/Drawer/Drawer";
import { CircularProgress } from "@material-ui/core";

const sliderContent = [
  {
    id: 1,
    text: "The price of petrol remained unchanged on July 6 after reaching a new record high on the previous day, according to a price notification by state-owned fuel retailers. The diesel price remained stable for the second consecutive day. The increase on July 5, 35th in two months, took the petrol price in Delhi closer to Rs 100 per litre-mark. The petrol price in the national capital soared to Rs 99.9 a litre and diesel was priced at Rs 89.4 per litre, according to Bharat Petroleum's price listing.",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra donec interdum morbi curabitur. At proin dignissim lectus tempor risus nisi dictumst aliquet. Pellentesque massa, in nunc viverra accumsan sem. Sagittis, ut sapien, eleifend platea senectus consectetur.",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sagittis, ut sapien, eleifend platea senectus consectetur.",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra donec interdum morbi curabitur. At proin dignissim lectus tempor risus nisi dictumst aliquet. Pellentesque massa, in nunc viverra accumsan sem. Sagittis, ut sapien, eleifend platea senectus consectetur. 🔥🔥🔥🔥🔥",
  },
];

const potentialTradeContent = [
  {
    id: 0,
    companyName: "Hedera HBAR",
    recommendHeading: "Sell",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
  {
    id: 1,
    companyName: "Hedera",
    recommendHeading: "Buy",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
  {
    id: 2,
    companyName: "Hedera",
    recommendHeading: "Buy",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
  {
    id: 3,
    companyName: "Hedera",
    recommendHeading: "Buy",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
  {
    id: 4,
    companyName: "Hedera",
    recommendHeading: "Buy",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
  {
    id: 5,
    companyName: "Hedera",
    recommendHeading: "Buy",
    recommendText:
      "In 2022, it reached a new level, and now everyone is very active in buying it. That's why we've identified it as a high-profile investment",
    sell: true,
  },
];



const EnterpriseModal = ({ open, handleClose, newsData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getDate = (timestamp) => new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const ref = useRef(null);
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      keepMounted={true}
      onClose={handleClose}
      open={open}
      className="rounded-[20px]"
    >
      <DialogTitle sx={{ position: "sticky", top: 0, left: 0,borderRadius:"10px" }}>
        <div className="flex justify-between items-center">
          <Link to={`/news/${newsData.id}`} className="flex items-center gap-3">
            <span className="h-full">
              <img src="/Link.svg" alt="link-icon" className="h-5" />
            </span>
            <span className="text-sm text-gray-500">Visit article</span>
          </Link>

          <IconButton onClick={handleClose}>
            <span>
              <img src="/close.svg" alt="close-icon" />
            </span>
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent
        sx={{
          maxHeight: "800px",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
        className="bg-white-100"
        ref={ref}
      >
        <div
          id="top-section"
          className="fluid-container mx-auto pl-1 pr-1 md:mt-4
          md:pl-4 md:pr-4 
          "
        >
          <div className="flex-col">
            <section className="flex items-start justify-between gap-8 mt-0 relative">
              {/* Left group */}
              <div className="flex-1">
                {newsData?.data?.article_heading ? (
                  <h2 className="text-lg md:text-xl lg:text-3xl mb-2 font-bold font-sourceSansPro max-w-screen-lg">
                    {newsData?.data?.article_heading}
                  </h2>
                ) : (
                  <div className="animate-pulse h-5 w-48 rounded-lg bg-gray-300"></div>
                )}

                {newsData?.data?.tickers ? (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {newsData?.data?.tickers?.map(
                      (ticker, index) => (
                        <Tag
                          text={ticker}
                          key={ticker + index}
                        />
                      )
                    )}
                  </div>
                ) : null}

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1 my-4 relative">
                    {newsData?.data?.added_utc ? (
                      <span className="text-light-gray text-xs md:text-xs lg:text-sm">
                        {getDate(newsData?.data?.added_utc)}
                      </span>
                    ) : (
                      <div className="animate-pulse w-30 h-5 bg-gray-300 rounded-lg"></div>
                    )}

                    {newsData?.data?.source ? (
                      <a
                        href={newsData?.data?.article_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs md:text-xs lg:text-sm text-arca-blue font-bold font-roboto uppercase underline mt-3 decoration-1"
                      >
                        Via {newsData?.data?.source}
                      </a>
                    ) : (
                      <div className="animate-pulse w-20 h-4 bg-gray-300 rounded-lg mt-5"></div>
                    )}
                  </div>
                  <button
                    className="bg-navy p-3 rounded-md md:hidden"
                    onClick={toggleDrawer(true)}
                  >
                    <img
                      className="h-full w-full"
                      src="/Filter-Alt.svg"
                      alt="right-panel-toggle"
                    />
                  </button>
                </div>

                <div className="w-full">
                  {newsData?.data?.image_url ? (
                    <img
                      src={
                        newsData?.data?.image_url
                          ? newsData?.data?.image_url
                          : ""
                      }
                      alt="news-bg"
                      className="h-3/6 w-full rounded-md"
                    />
                  ) : (
                    <div className="animate-pulse flex space-x-4">
                      <div className="h-96 w-full bg-gray-300 rounded-md"></div>
                    </div>
                  )}
                  {/* <p
                                    className="text-xs lg:text-sm mt-2 text-gray-500"
                                    dangerouslySetInnerHTML={{
                                        __html: newsData?.data?.description,
                                    }}
                                ></p> */}
                </div>

                <div className="text-gray-500 mt-10 text-sm md:text-sm lg:text-lg">
                  {newsData?.data?.article_body ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: newsData?.data
                          ?.article_body,
                      }}
                      className="article-content list-disc"
                    ></div>
                  ) : (
                    <div className="flex justify-center">
                      <CircularProgress
                        color="inherit"
                        size={60}
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-center my-12">
                  <a
                    href="#top-section"
                    className="text-link underline"
                  >
                    Back to top
                  </a>
                </div>

                {/* Comments sections */}
                <NewsComments />

                {/* Adding comments section */}
                <AddComment />
              </div>

              {/* Right group */}
              <div className="hidden md:flex flex-col items-center gap-7 md:w-[300px] lg:w-[400px] h-auto shrink px-2">
                <NewsDetailsCarousel
                  heading={"Quick Bytes"}
                  headingIconPath="/file-text.svg"
                  showControls={true}
                  data={sliderContent}
                  controllerName="quickBytes"
                  className="box-shadow"
                />

                <NewsDetailsCarousel
                  heading={"Potential Trades"}
                  showControls={true}
                  data={potentialTradeContent}
                  isPotentialTrade={true}
                  controllerName="potentialTrade"
                />

                <NewsDetailsCard
                  heading="Event's market impact:"
                  headingIconPath="/trending.svg"
                >
                  <div className="w-full text-gray-500">
                    <h4 className="text-center font-medium text-black text-lg">
                      Medium Impact
                    </h4>
                    <p>
                      The surprise OPEC+ production cut caused
                      oil prices to surge more than 6%, which
                      in turn gave a lift to energy shares,
                      with the Energy Select Sector SPDR ETF
                      jumping 4.1% and Chevron Corp., Exxon
                      Mobil Corp., and Occidental Petroleum
                      Corp. all experiencing gains. However,
                      U.S. stocks were mixed on Monday, and
                      the impact on the broader market was not
                      significant enough to be categorized as
                      high impact. The jump in oil prices
                      might make the Federal Reserve's
                      inflation-fighting job "a little more
                      difficult," but it is too soon to know
                      for sure, according to St. Louis Fed
                      President James Bullard.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                      <IconButton>
                        <img
                          className="h-6"
                          src="/thumb-up.svg"
                          alt="like-btn"
                        />
                      </IconButton>
                      <span className="font-semibold">
                        109
                      </span>
                    </div>

                    <div className="flex gap-1 items-center">
                      <IconButton>
                        <img
                          className="h-6"
                          src="/thumb-down.svg"
                          alt="dislike-btn"
                        />
                      </IconButton>
                      <span className="font-semibold">6</span>
                    </div>
                  </div>
                </NewsDetailsCard>

                <NewsDetailsCard
                  heading="Article Soundness Score"
                  headingIconPath="/file-text.svg"
                >
                  <div className="flex flex-col items-center w-full text-gray-500">
                    <div className="flex gap-2 items-center">
                      <h4 className="text-center font-medium text-black text-lg">
                        89
                      </h4>
                      <span className="text-gray-400 text-xs">
                        (1-100)
                      </span>
                    </div>

                    <p>
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Pharetra donec interdum
                      morbi curabitur. At proin dignissim
                      lectus tempor risus nisi dictumst
                      aliquet. Pellentesque massa, in nunc
                      viverra accumsan sem. Sagittis, ut
                      sapien, eleifend platea senectus
                      consectetur.
                    </p>
                  </div>
                </NewsDetailsCard>
              </div>
            </section>
          </div>
        </div>


        <CustomDrawer
          handler={toggleDrawer}
          state={isDrawerOpen}
          anchor={"right"}
          sx={{ zIndex: "9999 !important" }}
        >
          <div className="md:flex flex-col items-center gap-7 min-[766px]:basis-1/4 h-auto shrink mt-12 mb-6 px-3">
            <NewsDetailsCarousel
              heading={"Quick Bytes"}
              headingIconPath="/file-text.svg"
              showControls={true}
              data={sliderContent}
              controllerName="quickBytes"
            />

            <NewsDetailsCarousel
              heading={"Potential Trades"}
              showControls={true}
              data={potentialTradeContent}
              isPotentialTrade={true}
              controllerName="potentialTrade"
            />

            <NewsDetailsCard
              heading="Event's market impact:"
              headingIconPath="/trending.svg"
              containerClass="mb-10 border-2"
            >
              <div className="w-full text-gray-500">
                <h4 className="text-center font-medium text-black text-lg">
                  Medium Impact
                </h4>
                <p>
                  The surprise OPEC+ production cut caused oil
                  prices to surge more than 6%, which in turn gave
                  a lift to energy shares, with the Energy Select
                  Sector SPDR ETF jumping 4.1% and Chevron Corp.,
                  Exxon Mobil Corp., and Occidental Petroleum
                  Corp. all experiencing gains. However, U.S.
                  stocks were mixed on Monday, and the impact on
                  the broader market was not significant enough to
                  be categorized as high impact. The jump in oil
                  prices might make the Federal Reserve's
                  inflation-fighting job "a little more
                  difficult," but it is too soon to know for sure,
                  according to St. Louis Fed President James
                  Bullard.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <IconButton>
                    <img
                      className="h-6"
                      src="/thumb-up.svg"
                      alt="like-btn"
                    />
                  </IconButton>
                  <span className="font-semibold">109</span>
                </div>

                <div className="flex gap-1 items-center">
                  <IconButton>
                    <img
                      className="h-6"
                      src="/thumb-down.svg"
                      alt="dislike-btn"
                    />
                  </IconButton>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </NewsDetailsCard>

            <NewsDetailsCard
              heading="Article Soundness Score"
              headingIconPath="/file-text.svg"
              containerClass="mb-10 border-2"
            >
              <div className="flex flex-col items-center w-full text-gray-500">
                <div className="flex gap-2 items-center">
                  <h4 className="text-center font-medium text-black text-lg">
                    89
                  </h4>
                  <span className="text-gray-400 text-xs">
                    (1-100)
                  </span>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Pharetra donec interdum morbi
                  curabitur. At proin dignissim lectus tempor
                  risus nisi dictumst aliquet. Pellentesque massa,
                  in nunc viverra accumsan sem. Sagittis, ut
                  sapien, eleifend platea senectus consectetur.
                </p>
              </div>
            </NewsDetailsCard>
          </div>
        </CustomDrawer>



      </DialogContent>
    </Dialog>
  );
};

export default EnterpriseModal;
