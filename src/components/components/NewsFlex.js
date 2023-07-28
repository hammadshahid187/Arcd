import React, { useEffect, useState } from 'react'
import { BookmarkBorderOutlined, FavoriteBorderOutlined, OpenInNewOutlined } from "@material-ui/icons"
import StockButton from './StockButton'
import AddButton from './AddButton'
import axios from 'axios';
import News from './News';
import NewsLoading from './NewsLoading';
import { auth, db } from '../../config/Firebase';
import { Bookmark } from '@material-ui/icons';
import { Favorite } from '@material-ui/icons';
import { Twitter } from '@material-ui/icons';
import firebase from 'firebase';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}


const NewsFlex = ({ publisher_name, title, author, published_utc, article_url, tickers, image_url, description, id, history, loaded }) => {

    const date = new Date(published_utc)

    const [num, setNum] = useState(0)

    const [tickersData, setTickersData] = useState([])
    const { height, width } = useWindowDimensions()
    const [likeHover, setLikeHover] = useState(false)
    const [bookmarkHover, setBookmarkHover] = useState(false)

    const setTickers = async () => {
        var screenNum = 2;

        // if (width >= 1536 || width >= 1280 || width >= 1024) {
        if (width >= 1024) {
            screenNum = 2;
        } else {
            screenNum = 1;
        }

        const arr = [];

        for (var ticker = 0; ticker < Math.min(screenNum, tickers.length); ticker++) {
            const functionRef = firebase.app().functions('us-central1').httpsCallable('stockSnapshot');
            var tickerData = ""

            try {
                tickerData = await functionRef({
                    stockName: tickers[ticker],
                });
                tickerData['data'] = JSON.parse(tickerData.data);
                console.log("firebase", tickerData, tickers[ticker]);
                arr.push({
                    ticker: tickers[ticker],
                    percent: (tickerData.data.ticker.todaysChangePerc).toFixed(2)
                });
            }
            catch (error) {
                console.log("firebase error snap", error, tickers[ticker]);

                const functionRef = firebase.app().functions('us-central1').httpsCallable('lastDayClose');
                var lastDayClose = ""

                lastDayClose = await functionRef({
                    stockName: tickers[ticker],
                });
                lastDayClose['data'] = JSON.parse(lastDayClose.data);

                var data = {
                    Close: (lastDayClose.data.results[0].c).toFixed(2),
                }

                // get open-close data for date before lastDayClose.data.results[0].t\
                // var days_behind = 1;
                var dayBefore = ""
                const functionRef2 = firebase.app().functions('us-central1').httpsCallable('stockOpenClose');
                var dayBefore = ""
                dayBefore = await functionRef2({
                    stockName: tickers[ticker],
                    time: lastDayClose.data.results[0].t
                });
                dayBefore['data'] = JSON.parse(dayBefore.data);



                data['Prev Close'] = (dayBefore.data.close).toFixed(2);
                var percent = (((data.Close - data['Prev Close']) / data['Prev Close']) * 100).toFixed(2)

                arr.push({
                    ticker: tickers[ticker],
                    percent: percent,
                });
            }
        }

        setNum((tickers.length > screenNum) ? (tickers.length - screenNum) : 0);
        setTickersData(arr);
    };

    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)

    const likeHandle = async () => {
        var ref = db.collection("posts").doc(id)
        var doc = await ref.get()

        if (!doc.exists) {
            ref.set(
                {
                    id: id,
                    article_url: article_url,
                    author: author,
                    image_url: image_url,
                    tickers: tickers,
                    description: description,
                    publisher: publisher_name,
                    title: title,
                    published_utc: published_utc,

                }
            )
        }
        if (liked) {
            db.collection("likes").doc(`${uid}-${id}`).delete()
            setLiked(false)
        } else {
            console.log(id)
            db.collection("likes").doc(`${uid}-${id}`).set(
                {
                    user: uid,
                    id: id
                }
            )
            setLiked(true)
        }
    }

    const getLiked = async (userUid) => {
        var ref = db.collection("likes").doc(`${userUid}-${id}`)
        var data = await ref.get()

        if (data.exists) {
            setLiked(true)
        }
    }

    const getBookmarked = async (userUid) => {
        var ref = db.collection("bookmarks").doc(`${userUid}-${id}`)
        var data = await ref.get()

        if (data.exists) {
            setBookmarked(true)
        }
    }

    const bookmarkHandle = async () => {
        var ref = db.collection("posts").doc(id)
        var doc = await ref.get()

        if (!doc.exists) {
            ref.set(
                {
                    id: id,
                    article_url: article_url,
                    author: author,
                    image_url: image_url,
                    tickers: tickers,
                    description: description,
                    publisher: publisher_name,
                    title: title,
                    published_utc: published_utc,

                }
            )
        }
        if (bookmarked) {
            db.collection("bookmarks").doc(`${uid}-${id}`).delete()
            setBookmarked(false)
        } else {
            db.collection("bookmarks").doc(`${uid}-${id}`).set(
                {
                    user: uid,
                    id: id,
                }
            )
            setBookmarked(true)
        }
    }

    const [uid, setUid] = useState("")
    useEffect(() => {

        async function func() {
            firebase.auth().onAuthStateChanged(async function (user) {
                if (user) {
                    setUid(user.uid)
                    await getLiked(user.uid)
                    await getBookmarked(user.uid)
                    await setTickers()
                } else {
                    // No user is signed in.
                    console.log('There is no logged in user');
                }
            });

        }
        func()
    }, [])

    return (
        <div>
            {
                width < 1024

                    ?
                    (loaded ? <News published_utc={published_utc} publisher_name={publisher_name} title={title} author={author} tickers={tickers} description={description} image_url={image_url} article_url={article_url} key={author} id={id} /> : <NewsLoading />)
                    :
                    <div className="text-left relative justify-between lg:grid lg:grid-cols-2 cursor-pointer" onClick={() => { window.open(article_url) }}>
                        <div className="relative h-0 pb-2/3 mb-2">
                            <img className="absolute inset-0 w-full h-full object-cover rounded-lg" src={image_url} alt={title} />
                        </div>
                        <div>
                            <div className="lg:ml-6">
                                <div className="flex gap-1 mb-2 pt-1">
                                    <p className="lg:text-md text-gray-700">{date.toString().split(" ")[1]} </p>
                                    <p className="lg:text-md  text-gray-700">{date.toString().split(" ")[2]}, </p>
                                    <p className="lg:text-md text-gray-700">{date.toString().split(" ")[3]} </p>
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-2 font-bold line-clamp-2">{title}</h1>
                                    <div>
                                        <p className="text-sm text-gray-500 line-clamp-3">({publisher_name}) -- {description}</p>
                                    </div>
                                </div>
                                <div className="mb-2 absolute bottom-0 flex justify-between">
                                    <div>
                                        {
                                            num === 0
                                                ?
                                                <div className="space-x-2">
                                                    {
                                                        tickersData.map((ticker3) => {
                                                            return (
                                                                <StockButton stock={ticker3.ticker} percent={ticker3.percent} sign={ticker3.sign} key={ticker3.ticker} history={history} />
                                                            )
                                                        })
                                                    }
                                                </div>

                                                :
                                                <div className="space-x-2 flex">
                                                    {
                                                        tickersData.map((ticker3) => {
                                                            return (
                                                                <StockButton stock={ticker3.ticker} percent={ticker3.percent} sign={ticker3.sign} key={ticker3.ticker} history={history} />
                                                            )

                                                        })
                                                    }
                                                    <AddButton num={num} />
                                                </div>

                                        }
                                    </div>
                                </div>
                                <div className="lg:mb-2 mb-1 flex space-x-4 absolute bottom-0 right-0 cursor-pointer">
                                    <div className="cursor-pointer" onClick={(e) => {
                                        e.stopPropagation()
                                        bookmarkHandle()
                                    }}>
                                        {bookmarked ?
                                            <Bookmark />
                                            :

                                            <BookmarkBorderOutlined />

                                        }
                                    </div>

                                    <div className="cursor-pointer" onClick={(e) => {
                                        e.stopPropagation()
                                        likeHandle()
                                    }}>
                                        {liked ?
                                            <Favorite />
                                            :

                                            <FavoriteBorderOutlined />



                                        }
                                    </div>
                                    <div className="cursor-pointer" onMouseOver={() => { }} onClick={(e) => {
                                        window.open(`https://twitter.com/intent/tweet?text=${article_url}`)
                                        e.stopPropagation()
                                    }}>
                                        <Twitter style={{ fill: "#1DA1F2" }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </div>

    )
}

export default NewsFlex