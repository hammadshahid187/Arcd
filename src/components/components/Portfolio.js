import moment from 'moment';
import firebase from 'firebase';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { PlaidContext } from '../../services/Plaid/Plaid.context';
import Chart from 'react-apexcharts';
import WatchlistVertical from './WatchlistVertical';
// import Link from "./Link";
import AccountLink from './Accounts/AccountLink';
import WatchlistSingle from './WatchlistSingle';
import { symbolName } from 'typescript';

const Portfolio = ({ symbols, history, secondaryAccessTokens }) => {
	const { verifiedSecurityIds, investmentTransactions } =
		useContext(PlaidContext);
	const [series, setSeries] = useState([]);
	const [stockOptions, setStockOptions] = useState({});
	const [startedOn, setStartedOn] = useState(null);
	const [portfolioCalc, setPortfolioCalc] = useState(false);
	const [portfolioData, setPortfolioData] = useState([]);
	const [avgSeries, setAvgSeries] = useState(null);
	const [avgOptions, setAvgOptions] = useState(null);
	const [graphReady, setGraphReady] = useState(false);
	const [symbolsStr, setSymbolsStr] = useState('');
	const exchangeNames = {
		XNAS: 'NASDAQ',
		XNYS: 'NYSE'
	};

	const perChange = () => {
		var current = portfolioData[portfolioData.length - 1].y;
		var previous = portfolioData[portfolioData.length - 2].y;

		var currentPercent = ((current / previous - 1) * 100).toFixed(2);
		return (
			<div className='perChange'>
				<span className={`text-arca-${currentPercent > 0 ? 'blue' : 'red'}`}>
					{currentPercent}%
				</span>
			</div>
		);
	};

	const getObj = (object, key, default_value) => {
		return key in object ? object[key] : default_value;
	};

	const getValidTransactions = () => {
		console.log('graph steps 3');
		var validTransactions = {};

		// wait for verifiedSecurityIds to be populated
		if (investmentTransactions && verifiedSecurityIds) {
			// loop through all transactions
			investmentTransactions.forEach((transaction) => {
				// if transaction is valid (has security id) and security id is in verified security ids
				if (transaction.security_id in verifiedSecurityIds) {
					var ticker = verifiedSecurityIds[transaction.security_id];

					if (!(transaction.date in validTransactions)) {
						validTransactions[transaction.date] = {};
					}
					validTransactions[transaction.date][ticker] =
						getObj(validTransactions[transaction.date], ticker, 0) +
						transaction.quantity;
				}
			});
		}
		return validTransactions;
	};

	const getSortedTransactionsDates = () => {
		console.log('graph steps 2');
		var validTransactions = getValidTransactions();
		var sortedTransactions = [];
		// sort transactions by date received from validTransactions
		Object.keys(validTransactions)
			.sort()
			.forEach(function (key) {
				sortedTransactions.push({ [key]: validTransactions[key] });
			});
		return sortedTransactions;
	};

	const getSingleGraph = async (ticker, from_string, to_string) => {
		const from = moment(from_string, 'YYYY-MM-DD').format('YYYY-MM-DD');
		const to = moment(to_string, 'YYYY-MM-DD').format('YYYY-MM-DD');
		const multiplier = 1;
		var aggregatePolygon = '';
		try {
			const functionRef = firebase
				.app()
				.functions('us-central1')
				.httpsCallable('stockGraph');
			aggregatePolygon = await functionRef({
				stockName: ticker,
				multiplier: multiplier,
				timeType: 'day',
				from: from,
				to: to
			});
		} catch (e) {
			console.log('error t', ticker, e);
		}
		console.log('aggregatePolygon 2222', aggregatePolygon);
		aggregatePolygon['data'] = JSON.parse(aggregatePolygon.data);

		return aggregatePolygon;
	};

	const getGraphData = async () => {
		console.log('graph steps 1');
		var sortedTransactionsByDate = getSortedTransactionsDates();

		var graphData = [];
		var graphDataDate = [];
		const tickerQuantity = {};

		// loop on sorted transactions by date except last one
		for (let index = 0; index < sortedTransactionsByDate.length; index++) {
			const from = Object.keys(sortedTransactionsByDate[index])[0];
			// const to = Object.keys(sortedTransactionsByDate[index + 1])[0];
			const to_string =
				index != sortedTransactionsByDate.length - 1
					? Object.keys(sortedTransactionsByDate[index + 1])[0]
					: moment().format('YYYY-MM-DD');
			const to = moment(to_string, 'YYYY-MM-DD')
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
			console.log('lastDate', to);
			graphDataDate = [];

			// loop on all tickers for this date
			var transactionTickersOnDate = Object.keys(
				sortedTransactionsByDate[index][from]
			);
			for (let index2 = 0; index2 < transactionTickersOnDate.length; index2++) {
				var ticker = transactionTickersOnDate[index2];

				tickerQuantity[ticker] =
					getObj(tickerQuantity, ticker, 0) +
					sortedTransactionsByDate[index][from][ticker];
				var quantity = tickerQuantity[ticker];

				var singleGraph = await getSingleGraph(ticker, from, to);

				// If no data for this ticker, skip it
				if (!singleGraph.data.results) {
					continue;
				}
				setStartedOn(Object.keys(sortedTransactionsByDate[0])[0]);
				if (graphDataDate.length == 0) {
					graphDataDate = singleGraph.data.results.map((d, i) => ({
						t: d.t,
						c: d.c * quantity
					}));
					// console.log("graphDataDate", graphDataDate)
				} else {
					graphDataDate = graphDataDate.map((d, i) => ({
						t: d.t,
						c: d.c + singleGraph.data.results[i].c * quantity
					}));
					// console.log("graphDataDate", graphDataDate)
				}
			}
			// add graphDataDate values to graphData
			graphData = graphData.concat(graphDataDate);
			// console.log("graphDataDate 2 ", graphData)
		}
		return graphData;
	};

	const convertTime = (epoch) => {
		var d = new Date(0);
		d.setMilliseconds(epoch);
		d.setMinutes(d.getMinutes() + d.getTimezoneOffset() - 300);
		var hours = d.getHours();
		// var ampm = hours >= 12 ? 'pm' : 'am';
		// hours = hours % 12;
		// hours = hours ? hours : 12; // the hour '0' should be '12'

		var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
		var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

		var month = '' + (d.getMonth() + 1);
		// var weekday = d.getDay();
		// console.log(weekday)
		var date = d.getDate();
		// console.log(date)
		// if (weekday == 6) date -= 1;
		// else if (weekday == 0) date -= 2;
		var day = '' + date;
		var year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		var year_month_day = '';

		year_month_day = [year, month, day].join('-');

		return year_month_day + ' ' + [hours, minutes, seconds].join(':');
	};

	const getIndex = async () => {
		console.log('lastDate', moment().subtract(1, 'days').format('YYYY-MM-DD'));
		var reults = await getSingleGraph(
			'SPY',
			startedOn,
			moment().subtract(1, 'days').format('YYYY-MM-DD')
		);
		var index = reults.data.results.map((d, i) => ({
			t: d.t,
			c: d.c
		}));
		return index;
	};

	const getCompanyDesc = firebase
		.app()
		.functions('us-central1')
		.httpsCallable('companyDesc');

	useEffect(async () => {
		console.log('graph steps called l', verifiedSecurityIds);
		setPortfolioCalc(false);
		if (Object.keys(verifiedSecurityIds).length && investmentTransactions) {
			console.log('graph steps started');
			var data = await getGraphData();

			var arrPolygon = [];

			for (let index = 0; index < data.length; index++) {
				arrPolygon.push({
					x: convertTime(data[index].t),
					y: data[index].c.toFixed(2)
				});
			}

			setPortfolioCalc(true);
			setPortfolioData(arrPolygon);
			// console.log("graph steps done", data)
		}
	}, [verifiedSecurityIds, investmentTransactions]);

	useEffect(async () => {
		setGraphReady(false);
		if (portfolioCalc) {
			var indexData = await getIndex();

			var arrIndex = [];
			for (let index = 0; index < indexData.length; index++) {
				arrIndex.push({
					x: convertTime(indexData[index].t),
					// convert y to string

					y:
						indexData[index].c *
						(portfolioData[0].y != 0 ? portfolioData[0].y / indexData[0].c : 1)
					// y: 1,
				});
			}

			setSeries([
				{
					name: 'Portfolio',
					data: portfolioData
				},
				{
					name: 'S&P 500',
					data: arrIndex
					// enabled: false
				}
			]);

			setStockOptions({
				chart: {
					type: 'area',
					height: 350
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth'
				},
				legend: {
					show: false
				},
				xaxis: {
					show: false,
					labels: {
						show: false
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					show: false,
					labels: {
						show: false
					}
				},
				fill: {
					opacity: 0.5
				},
				tooltip: {
					shared: true,
					intersect: false,
					y: [
						{
							formatter: function (y) {
								if (typeof y !== 'undefined') {
									return (' $' + y.toFixed(2))
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
								}
								return y;
							}
						},
						{
							formatter: function (y) {
								if (typeof y !== 'undefined') {
									return (' $' + y.toFixed(2))
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
								}
								return y;
							}
						}
					]
				},

				grid: {
					xaxis: {
						lines: {
							show: false
						}
					},
					yaxis: {
						lines: {
							show: true
						}
					},
					row: {
						colors: undefined,
						opacity: 0.5
					},
					column: {
						colors: undefined,
						opacity: 0.5
					}
				}
			});

			// average of portfolio and SPY
			var xAvg = [];
			var yAvg = [];
			// create avg of y of both graphs for each x
			// max length for avg graph = 10
			var constant =
				portfolioData.length > 5 ? parseInt(portfolioData.length / 5) : 1;
			for (var i = 0; i < portfolioData.length; i += constant) {
				// convert string to int

				// console.log("avg",  )
				xAvg.push(portfolioData[i].x);
				yAvg.push(
					(parseFloat(portfolioData[i].y) + parseFloat(arrIndex[i].y)) / 2
				);
			}
			console.log('avg', yAvg);
			setAvgSeries([
				{
					name: 'Average',
					data: yAvg
				}
			]);
			setAvgOptions({
				chart: {
					height: 350,
					type: 'line',
					zoom: {
						enabled: false
					},
					toolbar: {
						show: false
					}
				},
				colors: ['#0090B9'],
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth'
				},
				markers: {
					size: 10,
					colors: ['#30c5f0']
				},
				title: {
					text: 'Regression Model',
					align: 'center',
					style: {
						fontSize: '14px',
						fontWeight: 'Bold',
						color: '#555'
					}
				},
				xaxis: {
					show: false,
					categories: xAvg,
					labels: {
						show: false
					},
					axisBorder: {
						show: false
					},
					axisTicks: {
						show: false
					}
				},
				yaxis: {
					show: false,
					labels: {
						show: false
					}
				},
				tooltip: {
					enabled: false,
					y: [
						{
							formatter: function (y) {
								if (typeof y !== 'undefined') {
									return ' $' + y.toFixed(2);
								}
								return y;
							}
						}
					]
				},
				grid: {
					xaxis: {
						lines: {
							show: false
						}
					},
					yaxis: {
						lines: {
							show: false
						}
					}
				}
			});

			setGraphReady(true);
		}
	}, [portfolioData]);

	const resolvePromises = async (promises) => {
		var symbolsLocal = '';

		const res = await Promise.allSettled(promises);
		res.map(async (item, index) => {
			if (item.status === "fulfilled") {
				item.value.data = JSON.parse(item.value.data);
				if (item.value.data.tags.exchange && exchangeNames[item.value.data.tags.exchange]) {
					symbolsLocal += `{"s":"${exchangeNames[item.value.data.tags.exchange]}:${
						symbols[index]
						}"},`;
				}
			} else {
				console.log(`Promise for ${symbols[index]} failed with reason: ${item.reason}`);
			}
		});

		var remove = symbolsLocal.slice(0, -1);
		return remove;
	};

	useEffect(async () => {
		var promises = [];

		symbols.forEach(async (symbol) => {
			var promise = getCompanyDesc({
				stockName: symbol
			});

			if (promise !== undefined) {
				promises.push(promise);
			}
		});

		var res = await resolvePromises(promises);
		setSymbolsStr(res);
	}, [symbols]);

	useEffect(async () => {
		if (symbolsStr !== '') {
			console.log('symbolsStr', symbolsStr, symbolsStr.length);

			const scriptTag1 = document.createElement('script');

			scriptTag1.src =
				'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
			scriptTag1.async = true;

			scriptTag1.innerHTML = `{
                                    "colorTheme": "light",
                                    "dateRange": "12M",
                                    "showChart": true,
                                    "locale": "en",
                                    "width": "100%",
                                    "height": "100%",
                                    "largeChartUrl": "",
                                    "isTransparent": true,
                                    "showSymbolLogo": true,
                                    "showFloatingTooltip": false,
                                    "plotLineColorGrowing": "#0090B9",
                                    "plotLineColorFalling": "#FF413C",
                                    "gridLineColor": "rgba(240, 243, 250, 0)",
                                    "scaleFontColor": "rgba(120, 123, 134, 1)",
                                    "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
                                    "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
                                    "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
                                    "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
                                    "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
                                    "tabs": [
                                        
                                        {
                                        "title": "My Stocks",
                                        "symbols": [
                                            ${symbolsStr}

                                        ]
                                        },
                                        {
                                        "title": "Indices",
                                        "symbols": [
                                            {
                                            "s": "FOREXCOM:SPXUSD",
                                            "d": "S&P 500"
                                            },
                                            {
                                            "s": "FOREXCOM:NSXUSD",
                                            "d": "US 100"
                                            },
                                            {
                                            "s": "FOREXCOM:DJI",
                                            "d": "Dow 30"
                                            },
                                            {
                                            "s": "INDEX:NKY",
                                            "d": "Nikkei 225"
                                            },
                                            {
                                            "s": "INDEX:DEU40",
                                            "d": "DAX Index"
                                            },
                                            {
                                            "s": "FOREXCOM:UKXGBP",
                                            "d": "UK 100"
                                            }
                                        ],
                                        "originalTitle": "Indices"
                                        }
                                    ]
                                    }`;

			// create string from symbols varaible as json
			// var symbolsStr = ""
			// for (var i = 0; i < symbols.length; i++) {
			//     console.log(`{"s": "NASDAQ:${symbols[i]}",}`)
			// }
			// do above work using .map

			// create a script tag with the json object

			if (document.getElementById('widgetWatchlist').firstChild) {
				document.getElementById('widgetWatchlist').firstChild.remove();
				document.getElementById('widgetWatchlist').appendChild(scriptTag1);
			} else {
				document.getElementById('widgetWatchlist').appendChild(scriptTag1);
			}
		}

		return () => {
			// if (found) {
			//     document.body.removeChild(scriptTag);
			// document.getElementById('tanalysis').removeChild(scriptTag3);
			//     setFound(false)
			// }
		};
	}, [symbolsStr]);

	return (
		<>
			<div
				className='md:w-3/4 w-full'
				style={graphReady ? { height: "100%" } : { height: 600 }}
			>
				{secondaryAccessTokens.length > 0 ? (
					graphReady ? (
						<>
							<div className='title font-extralight'>
								Total Portofolio Value
								<br />
								All time chart compared to S&P 500
								<br />
								<div className='flex items-center space-x-2'>
									<div className='text-3xl font-bold text-gray-600'>
										$
										{portfolioData[portfolioData.length - 1].y
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										{/* ${} */}
									</div>
									{perChange()}
								</div>
							</div>
							<Chart
								options={stockOptions}
								series={series}
								type={'area'}
								height={350}
							/>
							<div className='flex mx-auto w-5/6 justify-between items-center xl:flex-row flex-col space-y-5'>
								<div className='flex xl:hidden space-x-4 mb-2'>
									<div className='flex items-center space-x-2 xl:space-x-4 text-gray-500 text-sm xl:text-2xl'>
										{' '}
										<div className='w-5 h-5 xl:h-10 xl:w-10 bg-blue-500 rounded-full'></div>{' '}
										<div>Your Portfolio</div>
									</div>
									<div className='flex items-center space-x-2 xl:space-x-4 text-gray-500 text-sm xl:text-2xl'>
										{' '}
										<div className='w-5 h-5 xl:h-10 xl:w-10 bg-green-500 rounded-full'></div>{' '}
										<div>S&P 500 index</div>
									</div>
								</div>
								<Chart
									options={avgOptions}
									series={avgSeries}
									type={'line'}
									height={150}
									className='w-full md:w-4/6 px-4'
								/>
								<div className='hidden xl:flex flex-col space-y-6'>
									<div className='flex items-center space-x-4 text-gray-500 text-sm xl:text-xl'>
										{' '}
										<div className='w-5 h-5 xl:h-6 xl:w-6 bg-blue-500 rounded-full'></div>{' '}
										<div>Your Portfolio</div>
									</div>
									<div className='flex items-center space-x-4 text-gray-500 text-sm xl:text-xl'>
										{' '}
										<div className='w-5 h-5 xl:h-6 xl:w-6 bg-green-500 rounded-full'></div>{' '}
										<div>S&P 500 index</div>
									</div>
								</div>
							</div>
							{/* <Canvas graph1={portfolioData} graph2={graph2} /> */}
						</>
					) : (
						<div
							className='flex justify-center items-center'
							style={{ height: 600, width: '100%' }}
						>
							<div className='rounded-md w-full h-full py-4'>
								<div className='animate-pulse w-full h-full space-x-4'>
									<div className='bg-gray-200 w-full h-full mb-2 rounded'></div>
								</div>
							</div>
						</div>
					)
				) : (
					<div className='flex h-full justify-center items-center'>
						<div className='mb-5'>
							{secondaryAccessTokens.length === 0 ? (
								<AccountLink text={'Link Brokerage with Plaid'} />
							) : (
								<></>
							)}
						</div>
					</div>
				)}
			</div>
			{/* <div className="md:w-1/4 md:block hidden rounded-2xl overflow-y-auto text-white h-100 p-4 px-6" style={{ backgroundColor: "#151522" }}>
                <div className="text-center text-white text-lg font-semibold">
                    My Watchlist
                </div>
                {
                    symbols.map((stock, index) => {
                        return (
                            <>
                                <WatchlistSingle ticker={stock} history={history} />
                            </>
                        )
                    })
                }

            </div> */}
			<div
				id='widgetWatchlist'
				className='md:w-2/6 md:block hidden rounded-2xl overflow-y-auto text-white h-100 p-4 px-6 '
			></div>
		</>
	);
};

export default Portfolio;
