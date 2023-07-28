import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Favorite,
    Bookmark,
    BookmarkBorderOutlined,
    FavoriteBorderOutlined,
    Twitter,
} from "@mui/icons-material";
import StockButton from "./StockButton";

import AddButton from "./AddButton";
import News from "./News";
import { db } from "../../config/Firebase";

import firebase from "firebase";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
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

const NewsMain = ({
    publisher_name,
    title,
    author,
    published_utc,
    article_url,
    tickers,
    image_url,
    description,
    id,
    history,
    likesRandom,
    isLoading,
}) => {
    // TODO: add the stock tickers

    const date = moment.unix(published_utc).toDate().toUTCString();

    const [num, setNum] = useState(0);

    const [tickersData, setTickersData] = useState([]);
    const [likes, setLikes] = useState(0);
    const { height, width } = useWindowDimensions();
    const [likeHover, setLikeHover] = useState(false);
    const [bookmarkHover, setBookmarkHover] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const setTickers = async () => {
        var screenNum = 2;

        // if (width >= 1536 || width >= 1280 || width >= 1024) {
        if (width >= 1024) {
            screenNum = 2;
        } else {
            screenNum = 1;
        }

        const arr = [];

        for (
            var ticker = 0;
            ticker < Math.min(screenNum, tickers.length);
            ticker++
        ) {
            const functionRef = firebase
                .app()
                .functions("us-central1")
                .httpsCallable("stockSnapshot");
            var tickerData = "";

            try {
                tickerData = await functionRef({
                    stockName: tickers[ticker],
                });
                tickerData["data"] = JSON.parse(tickerData.data);
                console.log("firebase", tickerData, tickers[ticker]);

                arr.push({
                    ticker: tickers[ticker],
                    percent: tickerData.data.ticker.todaysChangePerc.toFixed(2),
                });
            } catch (error) {
                console.log("firebase error snap", error, tickers[ticker]);

                const functionRef = firebase
                    .app()
                    .functions("us-central1")
                    .httpsCallable("lastDayClose");
                var lastDayClose = "";

                lastDayClose = await functionRef({
                    stockName: tickers[ticker],
                });
                lastDayClose["data"] = JSON.parse(lastDayClose.data);

                var data = {
                    Close: lastDayClose.data.results[0].c.toFixed(2),
                };

                // get open-close data for date before lastDayClose.data.results[0].t\
                // var days_behind = 1;
                var dayBefore = "";
                const functionRef2 = firebase
                    .app()
                    .functions("us-central1")
                    .httpsCallable("stockOpenClose");
                var dayBefore = "";
                dayBefore = await functionRef2({
                    stockName: tickers[ticker],
                    time: lastDayClose.data.results[0].t,
                });
                dayBefore["data"] = JSON.parse(dayBefore.data);

                data["Prev Close"] = dayBefore.data.close.toFixed(2);
                var percent = (
                    ((data.Close - data["Prev Close"]) / data["Prev Close"]) *
                    100
                ).toFixed(2);

                arr.push({
                    ticker: tickers[ticker],
                    percent: percent,
                });
            }
        }

        setNum(tickers.length > screenNum ? tickers.length - screenNum : 0);
        setTickersData(arr);
    };

    const likeHandle = async () => {
        var ref = db.collection("posts").doc(id);
        var doc = await ref.get();

        if (!doc.exists) {
            ref.set({
                id: id,
                article_url: article_url,
                author: author,
                image_url: image_url,
                tickers: tickers,
                description: description,
                publisher: publisher_name,
                title: title,
                published_utc: published_utc,
            });
        }
        if (liked) {
            db.collection("likes").doc(`${uid}-${id}`).delete();
            setLikes(likes - 1);
            setLiked(false);
        } else {
            console.log(id);
            db.collection("likes")
                .doc(`${uid}-${id}`)
                .set({ user: uid, id: id });
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    const getLiked = async (userUid) => {
        var likesCount = await firebase
            .firestore()
            .collection("likes")
            .where("id", "==", id)
            .get();
        setLikes(likesCount.size);

        if (uid) {
            var ref = db.collection("likes").doc(`${uid}-${id}`);
            var data = await ref.get();
            if (data.exists) {
                setLiked(true);
            }
        }
    };

    const getBookmarked = async () => {
        if (uid) {
            var ref = db.collection("bookmarks").doc(`${uid}-${id}`);
            var data = await ref.get();
            console.log(data.exists);
            if (data.exists) {
                setBookmarked(true);
            }
        }
    };

    const bookmarkHandle = async () => {
        var ref = db.collection("posts").doc(id);
        var doc = await ref.get();

        if (!doc.exists) {
            ref.set({
                id: id,
                article_url: article_url,
                author: author,
                image_url: image_url,
                tickers: tickers,
                description: description,
                publisher: publisher_name,
                title: title,
                published_utc: published_utc,
            });
        }
        if (bookmarked) {
            db.collection("bookmarks").doc(`${uid}-${id}`).delete();
            setBookmarked(false);
        } else {
            db.collection("bookmarks")
                .doc(`${uid}-${id}`)
                .set({ user: uid, id: id });
            setBookmarked(true);
        }
    };

    const [uid, setUid] = useState("");

    useEffect(() => {
        async function func() {
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    setUid(user.uid);
                    await getBookmarked();
                } else {
                    // No user is signed in.
                    console.log("There is no logged in user");
                }
            });
            await setTickers();
            await getLiked();
        }
        func();
    }, []);

    return (
        <div>
            {width < 768 ? (
                <div className="mb-4">
                    <News
                        published_utc={published_utc}
                        publisher_name={publisher_name}
                        title={title}
                        author={author}
                        tickers={tickers}
                        description={description}
                        image_url={image_url}
                        article_url={article_url}
                        id={id}
                    />
                </div>
            ) : (
                <div className="text-left content-left mb-6 lg:mb-10">
                    <div className="flex">
                        <div className="md:grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 gap-6">
                            <div
                                className="relative h-0 pb-2/3 col-span-6"
                                // onClick={() => {
                                //     window.open(article_url);
                                // }}
                            >
                                <img
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    src={image_url}
                                    alt={title}
                                />
                            </div>
                            <div className="relative pt-6 col-span-6">
                                <div className="flex justify-between content-center">
                                    <div className="flex gap-1 content-center">
                                        <p className="text-sm text-gray-700">
                                            {date.toString().split(" ")[1]}{" "}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {date.toString().split(" ")[2]},{" "}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            {date.toString().split(" ")[3]}{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4 mt-1 space-x-2">
                                    {!isLoading ? (
                                        tickersData.map((ticker3) => {
                                            return (
                                                <StockButton
                                                    stock={ticker3.ticker}
                                                    percent={ticker3.percent}
                                                    key={ticker3.ticker}
                                                    history={history}
                                                />
                                            );
                                        })
                                    ) : (
                                        <div className="flex space-x-4">
                                            {[...Array(2)].map((key, i) => {
                                                return (
                                                    <div className="rounded-md w-16 h-6">
                                                        <div className="animate-pulse w-full h-full space-x-4">
                                                            <div className="bg-gray-300 w-full h-full mb-2 rounded"></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {num === 0 ? (
                                        <></>
                                    ) : (
                                        <AddButton num={num} />
                                    )}{" "}
                                </div>
                                <Link
                                    className="mb-4 cursor-pointer"
                                    to={`news/${id}`}
                                >
                                    <p className="text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold line-clamp-2 font-sourceSansPro">
                                        {title}{" "}
                                    </p>

                                    <div className="cursor-pointer">
                                        <p className="text-sm text-gray-500 mr-10 line-clamp-5 ">
                                            ({publisher_name}) --{" "}
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: description
                                                        .replace(
                                                            "figure",
                                                            "span"
                                                        )
                                                        .replace("ul", "span")
                                                        .replace("<li>", ""),
                                                }}
                                            ></span>
                                        </p>
                                    </div>
                                </Link>
                                <div className="absolute bottom-0 right-0 visible"></div>
                                {/* <div className="flex space-x-8 mt-4 visible">
                        <div>
                            <FavoriteBorderOutlined fontSize="large" />
                        </div>
                        <div className="" onClick={() => { window.open(article_url) }}>
                            <OpenInNewOutlined fontSize="large" />
                        </div>
                    </div> */}{" "}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-5">
                            <div
                                className="flex-shrink cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    bookmarkHandle();
                                }}
                            >
                                {bookmarked ? (
                                    <Bookmark fontSize="large" />
                                ) : (
                                    <BookmarkBorderOutlined
                                        fontSize="large"
                                        sx={{ "&:hover": { color: "gray" } }}
                                    />
                                )}{" "}
                            </div>
                            <div className="grow"></div>
                            <div
                                className="flex-shrink cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    likeHandle();
                                }}
                            >
                                <div className="text-center text-xs">
                                    {likes + likesRandom}
                                </div>
                                {liked ? (
                                    <>
                                        <Favorite fontSize="large" />
                                    </>
                                ) : (
                                    <>
                                        <FavoriteBorderOutlined
                                            fontSize="large"
                                            sx={{
                                                "&:hover": { color: "gray" },
                                            }}
                                        />
                                    </>
                                )}{" "}
                            </div>

                            <div
                                className="flex-shrink cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(
                                        `https://twitter.com/intent/tweet?text=${article_url}`
                                    );
                                }}
                            >
                                <Twitter
                                    style={{ fill: "#1DA1F2" }}
                                    fontSize="large"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}{" "}
        </div>
    );
};

export default NewsMain;
