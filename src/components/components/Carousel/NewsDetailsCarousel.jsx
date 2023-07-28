import { useState } from "react";
import TradingChart from "../NewsChart/TradingChart";
import { IconButton } from "@mui/material";
import { ThumbsDownIcon, ThumbsUpIcon } from "../Icons";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
    Controller,
} from "swiper";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "./NewsDetailsCarousel.css";

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Controller]);

const PotentialTradeContent = ({
    companyName,
    recommendText,
    heading,
    controllerName,
}) => {
    const [isDevil, setIsDevil] = useState(false);

    return (
        <div
            className={`relative w-full transition-all min-h-[300px] rounded-md ${
                isDevil ? "bg-navy text-white" : "bg-white text-black"
            }`}
        >
            <div className="absolute top-10 right-5 flex items-center gap-1">
                <button
                    className={`swiper-button-prev swiper-button-prev-${controllerName} flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed`}
                ></button>

                <button
                    className={`swiper-button-next swiper-button-next-${controllerName} flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed`}
                ></button>
            </div>

            <div className="flex justify-between w-full items-center pb-4 border-b px-4 py-5">
                <div className="flex items-center gap-2 h-auto">
                    <span className="font-medium text-inherit">{heading}</span>
                </div>
            </div>

            <div className="flex gap-2 items-center snap-center mt-3 px-4">
                <span>
                    <img src="/stock-sample-icon.png" alt="stock" />
                </span>

                <span className="font-medium text-lg text-[18px]">{companyName}</span>
            </div>

            <div className="flex flex-col gap-1 mt-3 z-10 px-4">
                <span className="text-lg font-bold">$0.0596</span>
                <span className="text-md text-[#00BDB0]">0.98%</span>
            </div>

            <div className="flex flex-col items-center w-auto h-auto pb-3 border-b border-gray-300 px-4 py-5">
                <div className="flex justify-center relative w-full">
                    <TradingChart
                        colors={{
                            backgroundColor: !isDevil ? "white" : "#172b85",
                        }}
                        height={150}
                        width={300}
                    />
                </div>

                <div
                    className={`text-center text-sm md:text-sm lg:text-md ${
                        !isDevil ? "text-gray-500" : "text-gray-400"
                    }`}
                >
                    <span>Update Apr 02, 10:13 AM</span>
                </div>
            </div>

            <div
                className={`w-full mt-4  px-4 ${
                    !isDevil ? "text-gray-500" : "text-gray-400"
                }`}
            >
                <h4
                    className={`text-center font-medium text-lg ${
                        !isDevil ? "text-gray-500" : "text-white"
                    }`}
                >
                    {!isDevil ? "Sell" : "Devils Advocate: Buy"}
                </h4>
                <p className="text-left text-sm">{recommendText}</p>
            </div>

            <div className="flex justify-between w-full mt-5 px-4">
                <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                        <IconButton onClick={() => console.log("pressed")}>
                            <ThumbsUpIcon fill={isDevil ? "white" : "navy"} size="20px" />
                        </IconButton>
                        <span className="font-semibold">109</span>
                    </div>

                    <div className="flex gap-1 items-center">
                        <IconButton>
                            <ThumbsDownIcon
                                fill={isDevil ? "white" : "navy"} size="20px"
                            />
                        </IconButton>
                        <span className="font-semibold">6</span>
                    </div>
                </div>

                <button
                    className={`flex items-center justify-center border border-[#172B85] h-[32px] rounded-md px-3`}
                    onClick={() => setIsDevil((prev) => !prev)}
                >
                    <img
                        className="h-[24px]"
                        src={"/smiling-face-horn.svg"}
                        alt="smiling-face-horn"
                    />
                </button>
            </div>
        </div>
    );
};

const QuickBytesContent = ({
    headingIconPath,
    heading,
    text,
    controllerName,
}) => {
    return (
        <div className="relative min-w-[300px] bg-white transition-all px-3 pt-4 rounded-md min-h-[280px]">
            <div className="absolute top-10 right-5 flex items-center gap-1">
                <button
                    className={`swiper-button-prev swiper-button-prev-${controllerName} flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed`}
                ></button>

                <button
                    className={`swiper-button-next swiper-button-next-${controllerName} flex items-center justify-center p-2 rounded-full bg-arca-blue disabled:cursor-not-allowed`}
                ></button>
            </div>

            <div className="flex justify-between w-full items-center pb-4 border-b">
                <div className="flex items-center gap-2 h-auto">
                    {headingIconPath ? (
                        <img
                            src={headingIconPath}
                            alt="text-icon"
                            className="shrink-0"
                            style={{ height: "20px", width: "20px" }}
                        />
                    ) : null}

                    <span className="font-medium text-inherit">{heading}</span>
                </div>
            </div>

            <div className="mt-4 text-sm md:text-sm lg:text-md w-full ">
                <p className="text-gray-500">{text}</p>
            </div>
        </div>
    );
};

const NewsDetailsCarousel = ({
    headingIconPath,
    heading,
    data,
    isPotentialTrade,
    controllerName = "",
}) => {
    return (
        <Swiper
            pagination={{
                clickable: true,
            }}
            navigation={{
                nextEl: `.swiper-button-next-${controllerName}`,
                prevEl: `.swiper-button-prev-${controllerName}`,
            }}
            spaceBetween={20}
            keyboard={true}
            slidesPerView={1}
            direction="horizontal"
            mousewheel={{
                eventsTarget: "container",
                forceToAxis: true,
            }}
            className="newsDetails box-shadow pb-2 rounded-[10px]"
            controller={true}
        >
            <div
                className={`flex flex-col items-center transition-all h-auto rounded-md w-full`}
            >
                <div className="self-start flex mt-4 text-sm md:text-sm lg:text-md rounded-md">
                    {isPotentialTrade
                        ? data.map((item) => (
                              <SwiperSlide key={item.id}>
                                  <PotentialTradeContent
                                      companyName={item.companyName}
                                      recommendText={item.recommendText}
                                      heading={heading}
                                      headingIconPath={headingIconPath}
                                      controllerName={controllerName}
                                      key={item.id}
                                  />
                              </SwiperSlide>
                          ))
                        : data.map((item) => (
                              <SwiperSlide key={item.id}>
                                  <QuickBytesContent
                                      heading={heading}
                                      headingIconPath={headingIconPath}
                                      controllerName={controllerName}
                                      text={item.text}
                                      key={item.id}
                                  />
                              </SwiperSlide>
                          ))}
                </div>
            </div>
        </Swiper>
    );
};

export default NewsDetailsCarousel;
