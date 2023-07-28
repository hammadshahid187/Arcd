import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import Navbar from '../../components/Navbar'
import NewsGrid from '../../components/NewsGrid'
import Footer from '../../components/Footer'
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { db, auth } from '../../../config/Firebase'
import firebase from 'firebase'
import Details from '../../components/Chart/Details';
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
const ShowStockScreen = ({ match, history }) => {
    const { userType } = useContext(AuthenticationContext);

    const [stockName, setStockName] = useState(match.params.stock)
    const [data, setData] = useState([])
    const [idsMain, setIdsMain] = useState([])
    const [nextCursorUrl, setNextCursorUrl] = useState("")
    const [currentPercent, setCurrentPercent] = useState(0)
    const [currentPrice, setCurrentPrice] = useState(0)
    const [found, setFound] = useState(false);
    const [details, setDetails] = useState('');
    const [followed, setFollowed] = useState(false)
    const [uid, setUid] = useState("")
    const [companyData, setCompanyData] = useState({
        description: "",
        tags: {}
    })
    const [showMore, setShowMore] = useState(false);



    const viewMore = async () => {
        if (nextCursorUrl !== undefined) {
            var ids = idsMain;
            const functionRef = firebase.app().functions('us-central1').httpsCallable('nextCursorUrl');
            var newsData = ""
            try {
                newsData = await functionRef({
                    url: nextCursorUrl,
                });
                newsData['data'] = JSON.parse(newsData.data);
            }
            catch (error) {
                console.log("firebase error", error);
            }

            setNextCursorUrl(newsData.data.next_url)

            for (var i = 0; i < newsData.data.results.length; i++) {
                if (!ids.includes(newsData.data.results[i].id)) {
                    if (newsData.data.results[i].description && newsData.data.results[i].image_url) {
                        setData(oldArray => [...oldArray, newsData.data.results[i]])
                        ids.push(newsData.data.results[i].id)
                    }
                }
            }
        }

        setIdsMain(ids)
    }
    const stockMainInfo = async () => {
        console.log("Function called")
        const functionRef = firebase.app().functions('us-central1').httpsCallable('stockSnapshot');
        var snap = ""
        try {
            snap = await functionRef({
                stockName: stockName,
            });
            snap['data'] = JSON.parse(snap.data);
            console.log("firebase", snap, stockName);
            setFound(true);
        }
        catch (error) {

            console.log("firebase error", error, stockName);
        }

        var data = snap.data ? snap.data.ticker : { day: { o: 0 } }
        if (data.day.o != 0) {
            setCurrentPrice((data.lastTrade['p']).toFixed(2));
        }

        console.log(data)
        if (data.day.o == 0) {
            const functionRef = firebase.app().functions('us-central1').httpsCallable('lastDayClose');
            var lastDayClose = ""
            try {
                lastDayClose = await functionRef({
                    stockName: stockName,
                });
                lastDayClose['data'] = JSON.parse(lastDayClose.data);
                console.log("firebase", lastDayClose, stockName);
            }
            catch (error) {
                console.log("firebase error", error, stockName);
            }
            setCurrentPrice((lastDayClose.data.results[0].c).toFixed(2))
            var data = {
                Open: (lastDayClose.data.results[0].o).toFixed(2),
                High: (lastDayClose.data.results[0].h).toFixed(2),
                Low: (lastDayClose.data.results[0].l).toFixed(2),
                Close: (lastDayClose.data.results[0].c).toFixed(2),
                Vol: lastDayClose.data.results[0].v,
            }

            // get open-close data for date before lastDayClose.data.results[0].t\
            // var days_behind = 1;
            var dayBefore = ""
            const functionRef2 = firebase.app().functions('us-central1').httpsCallable('stockOpenClose');
            var dayBefore = ""
            try {
                dayBefore = await functionRef2({
                    stockName: stockName,
                    time: lastDayClose.data.results[0].t
                });
                dayBefore['data'] = JSON.parse(dayBefore.data);
                console.log("daybefore", dayBefore, stockName);
            }
            catch (error) {
                console.log("daybefore error", error, stockName);
            }

            data['Prev Close'] = (dayBefore.data.close).toFixed(2);
            console.log(data['Prev Close'], data.Close)
            var percent = (((data.Close - data['Prev Close']) / data['Prev Close']) * 100).toFixed(2)
            console.log(percent)
            setCurrentPercent(`${percent}`);
            setDetails(data);
        }
        else {


            setCurrentPercent(`${(data.todaysChangePerc).toFixed(2)}`);
            // type of data.day.o
            console.log(typeof (data.day.o))
            const stockDetails =
            {
                Open: data.day.o ? (data.day.o).toFixed(2) : "N/A",
                Low: data.day.l ? (data.day.l).toFixed(2) : "N/A",
                High: data.day.h ? (data.day.h).toFixed(2) : "N/A",
                Close: data.day.c ? (data.day.c).toFixed(2) : "N/A",
                Vol: data.day.v ? (data.day.v) : "N/A",
                "Prev Close": data.prevDay.c ? (data.prevDay.c).toFixed(2) : "N/A"
            }

            setDetails(stockDetails)
        }

    }
    const getNewsData = async () => {
        var ids = []
        var dataToSet = []
        // var newsData = ""

        const functionRef = firebase.app().functions('us-central1').httpsCallable('stockNews');
        var newsData = ""
        try {
            newsData = await functionRef({
                stockName: stockName,
            });
            newsData['data'] = JSON.parse(newsData.data);
            console.log("firebaseN", newsData, stockName);
        }
        catch (error) {
            console.log("firebase error", error, stockName);
        }

        setNextCursorUrl(newsData.data.next_url)

        for (var i = 0; i < newsData.data.results.length; i++) {
            if (!ids.includes(newsData.data.results[i].id)) {
                if (newsData.data.results[i].description && newsData.data.results[i].image_url) {
                    dataToSet.push(newsData.data.results[i])
                    ids.push(newsData.data.results[i].id)
                }
            }
        }

        setData(dataToSet)
        setIdsMain(ids)

    }
    const getFollowed = async (uidPers) => {
        var response = await db
            .collection("follows")
            .where("user", "==", uidPers)
            .where("isFollowing", "==", true)
            .where("stock", "==", stockName)
            .limit(1)
            .get();

        if (response) {
            if (response.docs.length) {
                setFollowed(true)
            }
            else {
                setFollowed(false)
            }
        }
        else {
            setFollowed(false)
        }
    }
    const followHandle = async () => {
        if (followed) {
            db.collection("follows").doc(`${uid}-${stockName}`).set(
                {
                    user: uid,
                    stock: stockName,
                    isFollowing: false

                })
                .then(() => setFollowed(false))
                .catch((error) => alert(error))

        } else {
            db.collection("follows").doc(`${uid}-${stockName}`).set(
                {
                    user: uid,
                    stock: stockName,
                    isFollowing: true
                })
                .then(() => setFollowed(true))
                .catch((error) => alert(error))
        }
    }
    const getCompanyDesc = async () => {
        const functionRef = firebase.app().functions('us-central1').httpsCallable('companyDesc');
        var companyDescLocal = await functionRef({
            stockName: stockName,
        });
        companyDescLocal = JSON.parse(companyDescLocal.data);
        setCompanyData(companyDescLocal)
    }

    useEffect(() => {
        stockMainInfo();
        getNewsData();
        getCompanyDesc();
        setShowMore(false)
        if (uid) {
            getFollowed(uid);
        }
    }, [stockName])

    useEffect(() => {

        setStockName(match.params.stock)
    }, [match.params.stock])


    useEffect(() => {
        async function func() {
            firebase.auth().onAuthStateChanged(function (user) {

                if (user) {
                    if (stockName.length > 5) {
                        history.push("/news")
                    } else {
                        setUid(user.uid)
                        getFollowed(user.uid)
                        stockMainInfo()
                        getNewsData()
                    }
                } else {
                    history.push("/login")
                    console.log('There is no logged in user');
                }
            });
        }
        func()
    }, [userType])

    useEffect(() => {
        if (found) {
            const scriptTag = document.createElement('script');
            const scriptTag2 = document.createElement('script');
            const scriptTag3 = document.createElement('script');
            const scriptTag4 = document.createElement('script');

            scriptTag.src = "https://s3.tradingview.com/tv.js";
            scriptTag.async = true;

            scriptTag3.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
            scriptTag3.async = true;

            var height;
            console.log("height w", window.innerWidth)
            if (window.innerWidth < 768) {
                height = "400"
                console.log("height", height)
            }
            else {
                height = "600"
                console.log("height", height)
            }

            scriptTag2.innerHTML = `new TradingView.widget({
                                        "width": "100%",
                                        "height": ${height},
                                        "symbol": "NASDAQ:${match.params.stock}",
                                        "interval": "D",
                                        "timezone": "Etc/UTC",
                                        "theme": "light",
                                        "style": "1",
                                        "locale": "en",
                                        "toolbar_bg": "#f1f3f6",
                                        "enable_publishing": false,
                                        "container_id": "tradingview_94d1e"
                                    })`;

            console.log("height", scriptTag2.innerHTML)

            scriptTag3.innerHTML = `{"interval": "1m",
                                        "width": "100%",
                                        "isTransparent": false,
                                        "height": "100%",
                                        "symbol": "NASDAQ:${match.params.stock}",
                                        "showIntervalTabs": true,
                                        "locale": "en",
                                        "colorTheme": "light"
                                    }`;

            scriptTag4.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
            scriptTag4.async = true;
            scriptTag4.innerHTML = `{
                                        "symbol": "NASDAQ:${match.params.stock}",
                                        "width": "100%",
                                        "locale": "en",
                                        "colorTheme": "light",
                                        "isTransparent": false
                                    }`;
            // document.getElementById('info').appendChild(scriptTag4);

            document.getElementById('chart').appendChild(scriptTag);

            // if scriptTag3 exist in tanalysis div, remove it
            if (document.getElementById('tanalysis').firstChild) {

                document.getElementById('tanalysis').removeChild(document.getElementById('tanalysis').firstChild);
                document.getElementById('tanalysis').appendChild(scriptTag3);

            } else {
                document.getElementById('tanalysis').appendChild(scriptTag3);
            }

            if (document.getElementById('info').firstChild) {

                document.getElementById('info').removeChild(document.getElementById('info').firstChild);
                document.getElementById('info').appendChild(scriptTag4);

            } else {
                document.getElementById('info').appendChild(scriptTag4);
            }

            scriptTag.onload = function () {
                document.getElementById('chart').appendChild(scriptTag2);
            }
        }

        console.log("updated", stockName)

    }, [found, stockName]);

    return (
        <div>
            <Navbar history={history} />
            <div className="flex justify-center mt-16">
                <div className="lg:w-3/4 w-5/6">
                    <div className=''>

                        <div>
                            {
                                found ?
                                    (
                                        <div className="w-full mx-auto">
                                            <div className="float-left w-full" id="info">
                                                {/* <h1 className="text-3xl font-bold ">{companyData.name}</h1>
                                                <div className="flex space-x-4 mb-4">

                                                    <div className="flex items-end space-x-1">
                                                        <p className="text-2xl font-semibold">${currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                                        
                                                        
                                                        <div className={`text - arca - ${currentPercent > 0 ? 'blue' : 'red'} rounded - md pl - 1 pr - 1 text - white mb - 1 text - sm`}>
                                                            <p>{currentPercent}%</p>
                                                            
                                                        </div>

                                                    </div>


                                                </div> */}
                                            </div>
                                            {/* <span className='float-right rounded-md bg-gray-100 py-1 px-2'>{stockName}</span> */}
                                            <div className="clear-both"></div>


                                            <div className="cursor-pointer mt-10">

                                                {
                                                    userType == 'Premium' ?
                                                        <button onClick={() => { followHandle() }} type="button" className={`rounded-md bg-gray-${followed ? '50' : '200 hover:bg-gray-100'} px-3 py-2 mr-1 mb-2`} >Follow{followed ? 'ing' : ''}</button>
                                                        :
                                                        <button title="Need Premium Account" type="button" className="cursor-not-allowed rounded-md bg-gray-50 px-3 py-2 mr-1 mb-2" >Follow</button>

                                                }
                                            </div>

                                            <div class="tradingview-widget-container mt-10">
                                                <div id="tradingview_94d1e"></div>
                                                <div class="tradingview-widget-copyright"><a href={"https://www.tradingview.com/symbols/NASDAQ-" + stockName + "/"} rel="noopener" target="_blank"><span class="blue-text">{stockName} Chart</span></a> by TradingView</div>
                                                <div id="chart" ></div>
                                            </div>


                                            <Details details={details} />
                                            <div className='mt-4'>
                                                {
                                                    companyData.description ?
                                                        <>
                                                            <div className='text-xl font-bold'>About {companyData.fullName}</div>
                                                            {showMore ? companyData.description : `${companyData.description.substring(0, 250)} `}
                                                            {
                                                                companyData.description.length > 250 ?
                                                                    <button className="btn ml-2 text-blue-700" onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</button>
                                                                    :
                                                                    <></>
                                                            }
                                                        </>
                                                        : <></>
                                                }
                                                <div className="flex space-x-2 mt-2">
                                                    {
                                                        Object.keys(companyData.tags).map((tag, key) => {
                                                            return (
                                                                companyData.tags[tag] ?
                                                                    <div key={key} className='rounded-md leading-4 bg-gray-100 py-2 px-2'>
                                                                        {
                                                                            tag == "dividend" ?
                                                                                "Dividend"
                                                                                : companyData.tags[tag]
                                                                        }
                                                                    </div>
                                                                    :
                                                                    <></>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>

                                            <div className="mt-10 ">

                                                <div class="tradingview-widget-container">
                                                    <div class="tradingview-widget-container__widget"></div>
                                                    <div class="tradingview-widget-copyright"><a href={"https://www.tradingview.com/symbols/NASDAQ-" + stockName + "/technicals/"} rel="noopener" target="_blank"><span class="blue-text">Technical Analysis for {stockName}</span></a> by TradingView</div>
                                                    <div className="">
                                                        <div id="tanalysis" style={{ height: 450, width: "100%" }}></div>
                                                        {/* <div id="analysis" style={{ height: '100%', width: "100%" }}></div> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <div className='flex justify-center mt-16'>
                                            <div className='w-full mx-auto'>
                                                <div className="rounded-md w-32 h-8">
                                                    <div className="animate-pulse w-full h-full space-x-4">
                                                        <div className="bg-gray-200 w-full h-full rounded"></div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center" style={{ height: 350 }}>
                                                    <div className="rounded-md w-full h-full py-4">
                                                        <div className="animate-pulse w-full h-full space-x-4">
                                                            <div className="bg-gray-200 w-full h-full mb-2 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="flex justify-center items-center" style={{ height: 150 }}>
                                                    <div className="rounded-md w-full h-full py-4">
                                                        <div className="animate-pulse w-full h-full space-x-4">
                                                            <div className="bg-gray-200 w-full h-full mb-2 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>


                                    )}
                            <div className="text-left mt-16">
                                <p className="text-lg mb-6">Recent News</p>
                                <div>
                                    {/* {data ? "true" : "false"} */}
                                    <NewsGrid data={data} history={history} loaded={data.length} />
                                </div>
                                {
                                    data ?
                                        <div className="flex justify-center mt-10">
                                            {
                                                nextCursorUrl &&
                                                <button className="mb-14 pl-6 pr-6 md:pr-6 md:pl-6 pt-1 pb-1 border border-arca-blue rounded-3xl cursor-pointer" onClick={() => { viewMore() }}>
                                                    <p className="font-bold text-arca-blue text-lg md:text-lg lg:text-lg font-sourceSansPro">VIEW MORE</p>
                                                </button>
                                            }
                                        </div>
                                        :
                                        <></>
                                }

                            </div>







                        </div>


                    </div>








                </div>

            </div>
            <div className='bottom-0'>
                <Footer ad={userType != "Premium"} />
            </div>



        </div>
    )
}

export default ShowStockScreen
