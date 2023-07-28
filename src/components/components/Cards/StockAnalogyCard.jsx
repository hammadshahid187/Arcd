import moment from "moment";
import { ArrowLeft, ArrowRight } from "../Icons";
import { SwiperSlide } from "swiper/react";
import { useState, useRef } from "react";
import TradingChart from "../NewsChart/TradingChart";
import StockAnalogyCarousel from "../Carousel/StockAnalogyCarousel";

const m = moment();

const tickersArray = ["AAPL", "TMUS", "SBUX", "APPE", "GLLR", "AAPL"];

const DateButton = ({ date, setCurrentDate, currentDate }) => {
    return (
        <button
            className={`transition-all snap-center text-navy font-medium py-3 px-[18px] text-sm rounded-lg ${
                date === currentDate
                    ? "border border-navy"
                    : "border border-transparent"
            }`}
            onClick={() => setCurrentDate(date)}
        >
            {date}
        </button>
    );
};

const TickerButton = ({ tickerName, currentTicker, setCurrentTicker }) => {
    return (
        <button
            className={`transition-all font-Manrope rounded-full border-navy border py-2 px-5 text-xs  ${
                currentTicker === tickerName
                    ? "bg-navy text-white"
                    : "bg-white text-navy"
            }`}
            onClick={() => setCurrentTicker(tickerName)}
        >
            {tickerName}
        </button>
    );
};

const StockAnalogyCard = () => {
    const noOfDays = m.daysInMonth();
    const dateContainerRef = useRef(null);
    const daysArray = Array.from(new Array(noOfDays), (_val, i) => i + 1);
    const [currentDate, setCurrentDate] = useState(m.day());
    const [currentTicker, setCurrentTicker] = useState("");

    const dateSliderController = (direction) => {
        const dateContainer = dateContainerRef.current;

        let scrollAmount = 0;

        if (direction === "left") {
            scrollAmount = dateContainer.scrollLeft - dateContainer.offsetWidth;
        } else {
            scrollAmount = dateContainer.scrollLeft + dateContainer.offsetWidth;
        }

        dateContainer.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col items-center text-black font-Manrope">
            <div className="flex gap-2 w-[94%] self-center mb-6">
                <button
                    className="rounded-full shadow-bulletin h-auto p-4 shrink-0"
                    onClick={() => dateSliderController("left")}
                >
                    <ArrowLeft fill="#172B85" />
                </button>

                <div
                    className="hide-scrollbar flex-1 flex items-center overflow-x-auto snap-proximity snap-x"
                    ref={dateContainerRef}
                >
                    {daysArray.map((item) => (
                        <DateButton
                            key={item}
                            date={item}
                            setCurrentDate={setCurrentDate}
                            currentDate={currentDate}
                        />
                    ))}
                </div>

                <button
                    className="rounded-full shadow-bulletin h-auto p-4 shrink-0"
                    onClick={() => dateSliderController("right")}
                >
                    <ArrowRight fill="#172B85" />
                </button>
            </div>

            <div className="flex w-[83%] self-center">
                <StockAnalogyCarousel>
                    {tickersArray.map((ticker, i) => (
                        <SwiperSlide key={i}>
                            <TickerButton
                                tickerName={ticker}
                                currentTicker={currentTicker}
                                setCurrentTicker={setCurrentTicker}
                            />
                        </SwiperSlide>
                    ))}
                </StockAnalogyCarousel>
            </div>

            <div className="flex items-start w-[50%] justify-between mt-3 z-10">
                <div className="flex items-center gap-1">
                    <span className="h-full shrink-0">
                        <img
                            src="/trade_icon.svg"
                            alt="trade-icon"
                            className="h-8"
                        />
                    </span>
                    <span className="font-semibold">AMZM</span>
                </div>

                <div className="flex flex-col items-end">
                    <div className="font-bold flex items-center">
                        <span className="text-gray-400 text-lg -mt-[1px]">
                            $
                        </span>
                        <span className="text-[22px]">79.08</span>
                    </div>
                    <span className="flex items-center gap-[2px] text-[15px] tracking-wide text-brand-green font-semibold">
                        <span className="shrink-0 -mt-[1px]">
                            <img
                                src="/trade_green_arrow.svg"
                                alt="arrow-up-icon"
                            />
                        </span>
                        0.98%
                    </span>
                </div>
            </div>

            <div className="w-full -mt-9">
                <TradingChart height={200} width={100} />
            </div>
        </div>
    );
};

export default StockAnalogyCard;
