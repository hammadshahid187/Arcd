import { useState } from "react";
import TradingChart from "../NewsChart/TradingChart";
import { ThumbsUpIcon, ThumbsDownIcon } from "../Icons";
import { IconButton } from "@mui/material";
import "./trade-card.css";

const TradeCard = () => {
    const [isDevil, setIsDevil] = useState(false);
    const devilBtnHandler = () => {
        setIsDevil((prev) => !prev);
    };

    return (
        <div
            className={`trending-trades flex flex-col snap-center p-2 min-w-[240px] max-w-lg shadow-bulletin rounded-md text-base transition-all ${
                isDevil ? "bg-navy text-gray-400" : "bg-white text-gray-500 "
            }`}
        >
            <div className="flex flex-col items-center">
                <h1
                    className={`font-[200] text-[18px] ${
                        isDevil ? "text-white" : "text-black"
                    }`}
                >
                    {isDevil ? "Devil's Advocate: Buy" : "Sell"}
                </h1>
                <span className="text-xs py-2">(short-term)</span>
            </div>
            <p className="text-[12px] leading-tight mt-1 line-clamp-2">
                In 2022, it reached a new level, and now everyone is very
                active....
            </p>

            <div className="flex flex-col items-center mt-2">
                <div className="flex gap-1 items-center">
                    <span className="h-6">
                        <img
                            src="/stock-sample-icon.png"
                            alt="stock-icon"
                            className="h-full w-full"
                        />
                    </span>
                    <span
                        className={`font-semibold text-[14px] ${
                            isDevil ? "text-white" : "text-black"
                        }`}
                    >
                        Hedera HBAR
                    </span>
                </div>

                <div className="flex items-center gap-3 mt-2 text-[13px]">
                    <span
                        className={`font-[400] tracking-wider ${
                            isDevil ? "text-white" : "text-black"
                        }`}
                    >
                        $0.0596
                    </span>
                    <span className="text-brand-green">0.98%</span>
                </div>
            </div>
            <TradingChart
                height={100}
                width={100}
                colors={{ backgroundColor: isDevil ? "#172b85" : "white" }}
            />

            <div className="flex flex-col items-center">
                <span className="text-xs mt-1">Update Apr 02, 10:13 AM</span>

                <div
                    className={`flex items-center justify-between w-full mt-2 ${
                        isDevil ? "text-white" : ""
                    }`}
                >
                    <div className="flex items-center">
                        <div className="flex items-center">
                            <IconButton size="small">
                                <ThumbsUpIcon
                                    size="20"
                                    fill={isDevil ? "white" : "navy"}
                                />
                            </IconButton>

                            <span className="text-[12px]">109</span>
                        </div>

                        <div className="flex items-center">
                            <IconButton size="small">
                                <ThumbsDownIcon
                                    size="20"
                                    fill={isDevil ? "white" : "navy"}
                                />
                            </IconButton>

                            <span className="text-[12px]">6</span>
                        </div>
                    </div>

                    <button
                        className={"border border-navy py-1 px-3 mr-2 rounded devil "+(isDevil?'selected':'')}
                        onClick={devilBtnHandler}
                    >
                        <span className="h-full">
                            <img
                                src="/smiling-face-horn.svg"
                                alt="devil-icon"
                                className="h-4"
                            />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeCard;

// absolute bottom-0 left-0 translate-x-[40%]
