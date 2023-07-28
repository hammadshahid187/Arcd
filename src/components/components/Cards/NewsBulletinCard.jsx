import { useContext, useEffect, useState } from "react";
import { FilledBtn } from "../Button/Button";
import EnterpriseModal from "../Modal/EnterpriseModal";
import { ExploreStockNewsContext } from "../../../services/exploreStocksNews/exploreStocksNews.context";
import StockButton from "../StockButton";
import firebase from 'firebase'

const NewsBulletinCard = ({ title, published_utc, description, tickers, history, newsData }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [date, setDate] = useState("");
    const [timeAgo, setTimeAgo] = useState("");

    const [mainTicker, setMainTicker] = useState("");

    const { fetchTickerPercentage } = useContext(ExploreStockNewsContext);
    // date in MMM DD, YYYY format
    useEffect(() => {
        const date = new Date(published_utc).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });



        const timeAgo = () => {
            const date = new Date(published_utc * 1000);
            const currentDate = new Date();
            const diff = currentDate - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor(diff / (1000 * 60));
            const seconds = Math.floor(diff / 1000);
            if (days > 0) {
                return `${days}days ago`;
            } else if (hours > 0) {
                return `${hours}hr ago`;
            } else if (minutes > 0) {
                return `${minutes}min ago`;
            } else {
                return `${seconds}sec ago`;
            }
        };

        getMainTicker();

        setDate(date);
        setTimeAgo(timeAgo());
    }, [published_utc]);

    const getMainTicker = async () => {
        const per = await fetchTickerPercentage(tickers[0]);
        var branding = await getCompanyDesc(tickers[0]);
        setMainTicker({
            ticker: tickers[0],
            percentage: per,
            branding: branding
        })
    }

    const getCompanyDesc = async (stockName) => {
        const functionRef = firebase.app().functions('us-central1').httpsCallable('companyDesc');
        var companyDescLocal = await functionRef({
            stockName: stockName,
        });
        companyDescLocal = JSON.parse(companyDescLocal.data);
        return companyDescLocal['branding'];
    }

    const handleClose = () => {
        setModalOpen(false);
    };

    const readMoreHandler = () => {
        setModalOpen(true);
    };

    return (
        <div className="bulletin flex flex-col text-gray-500 text-xs shadow-bulletin p-3 py-4 rounded-[10px] mb-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <span className="shrink-0 flex">
                        <img
                            src="/amazon-logo.svg"
                            alt="logo"
                            className="object-cover object-center"
                        />
                        <span className="my-auto ml-2 font-medium text-black">TMUS</span>
                    </span>
                    <span>{date}</span>
                    {/*{
                        mainTicker.percentage &&
                        <StockButton
                            stock={mainTicker.ticker}
                            percent={mainTicker.percentage}
                            key={0}
                            history={history}
                        />

                    }*/}
                </div>
                <span>{timeAgo}</span>
            </div>

            <h1
                className="text-black font-[600] !leading-[23px] text-[16px] mt-3"
                style={{ lineHeight: "21px" }}
            >
                {title}
            </h1>

            <div className="mt-2 text-grey-new">
                <span className="text-[10px] py-2">Adria Cimino | Jan 6, 2023</span>
                <p className="mt-1 mb-2 line-clamp-3 mb-3">
                    <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </p>
                <FilledBtn text="Read more" handler={readMoreHandler} />
            </div>

            <EnterpriseModal open={modalOpen} handleClose={handleClose} newsData={newsData} />
        </div>
    );
};

export default NewsBulletinCard;
